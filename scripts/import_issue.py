"""Convert a Loops issue email (.eml) into public/archive/<id>.md.

Usage:
    python3 scripts/import_issue.py <issue.eml> <issue_id> "<Issue Title>" [--preheader "<preview text>"]

Example:
    python3 scripts/import_issue.py ~/Downloads/"Issue #011_ Foo.eml" 011 "Foo Bar"

Replaces the old one-off parse_NNN.py / fix_NNN.py scripts. It applies every
cleanup those scripts did for the recurring layout: tracking pixels, the Loops
footer, section headings, Sandbox project headings, and Radar categories and
list items. Edits to the closing CTA are still done by hand.
"""
import argparse
import email
import os
import re
from email import policy
from html.parser import HTMLParser

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE_DIR = os.path.join(BASE_DIR, 'public', 'archive')

SECTION_HEADINGS = [
    '🔬 The Sandbox',
    '☕ The Curious Non-Dev',
    '📡 The Radar',
    '🏗️ Closing Thoughts',
]


class SimpleHTMLToMD(HTMLParser):
    def __init__(self):
        super().__init__()
        self.md = []
        self.current_tag = None
        self.ignore_tags = ['style', 'script', 'head', 'title']

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attrs_dict = dict(attrs)

        if tag == 'img':
            src = attrs_dict.get('src') or ''
            alt = attrs_dict.get('alt') or 'Image'
            if ('http' in src and 'twitter' not in src.lower() and 'linkedin' not in src.lower()
                    and 'loops.so/api' not in src and 'poweredbyloops' not in src
                    and 'c.vialoops.com' not in src):
                self.md.append(f"\n\n![{alt}]({src})\n\n")

    def handle_endtag(self, tag):
        if tag in ['p', 'h1', 'h2', 'h3', 'li', 'div', 'tr']:
            self.md.append('\n\n')
        self.current_tag = None

    def handle_data(self, data):
        data = data.strip()
        if not data or self.current_tag in self.ignore_tags:
            return

        if self.current_tag == 'h2':
            self.md.append(f"## {data}")
        elif self.current_tag == 'h3':
            self.md.append(f"### {data}")
        elif self.current_tag == 'li':
            self.md.append(f"- {data}")
        elif self.current_tag == 'a':
            self.md.append(f" {data} ")
        else:
            if "View this email in your browser" not in data and "Unsubscribe" not in data:
                self.md.append(data + " ")


def extract_html(eml_path):
    with open(eml_path, 'rb') as f:
        msg = email.message_from_binary_file(f, policy=policy.default)
    for part in msg.walk():
        if part.get_content_type() == 'text/html':
            return part.get_content()
    raise SystemExit(f"No text/html part found in {eml_path}")


def to_markdown(html_content, issue_id, preheader=None):
    parser = SimpleHTMLToMD()
    parser.feed(html_content)
    text = "".join(parser.md)

    # Invisible preview-text padding and zero-width characters
    text = re.sub(r'[​‌‍⁠﻿­ ͏]+', '', text)
    if preheader:
        text = text.replace(preheader, '')

    # Tracking pixels and Loops badges that slipped through
    text = re.sub(r'!\[.*?\]\(https://c\.vialoops\.com.*?\)\n+', '', text)
    text = re.sub(r'!\[Loops\.so\]\(https://app\.loops\.so/.*?\.png\)\n+', '', text)

    # Loops footer
    text = text.split('How did we do this week?')[0]

    # The email repeats the title as plain text; the H1 is written separately
    text = re.sub(rf'^(?:🗞️\s*)?Issue #{issue_id}:[^\n]*\n+', '', text.strip())

    # Top-level sections
    for heading in SECTION_HEADINGS:
        text = re.sub(rf'^[ \t]*({re.escape(heading)}[^\n]*)', r'## \1', text, flags=re.M)

    text = ''.join(format_section(chunk) for chunk in re.split(r'(?m)^(?=## )', text))

    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def format_section(chunk):
    if chunk.startswith('## 🔬 The Sandbox'):
        # Project headers: "1. Cutter ✂️ (Reverse Engineering Platform)", sometimes
        # run together with the "What is it?" that follows
        chunk = re.sub(r'^[ \t]*([1-9]\.\s+[^\n]+?)\s+What is it\?', r'### \1\n\nWhat is it?', chunk, flags=re.M)
        chunk = re.sub(r'^[ \t]*([1-9]\.\s+[^\n]*\([^\n]*\))[ \t]*$', r'### \1', chunk, flags=re.M)
        # "Trivy 🛡️(Container" -> "Trivy 🛡️ (Container"
        chunk = re.sub(r'^(###[^\n(]*[^\s(])\(', r'\1 (', chunk, flags=re.M)

    if chunk.startswith('## 📡 The Radar'):
        # Entries: "owner/repo (~3.5k Stars) - ..." or "Odoo (37k+ Stars) - ..."
        chunk = re.sub(r'^[ \t]*([^\s#*>!\[-][^\n]*?\s\(~?[\d.,]+[kKmM]?\+?\s*Stars\)\s+[-–—]\s)', r'- \1', chunk, flags=re.M)
        # Categories: short emoji-led lines such as "💼 Financial Infrastructure & Accounting"
        chunk = re.sub(r'^[ \t]*([^\x00-\x7f][^\n]{0,80}?)[ \t]*$', r'### \1', chunk, flags=re.M)

    return chunk


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('eml', help='Path to the issue email exported from Loops')
    ap.add_argument('issue_id', help='Three-digit issue number, e.g. 011')
    ap.add_argument('title', help='Issue title in Title Case, e.g. "The CVE Season"')
    ap.add_argument('--preheader', help='Email preview text to strip from the top')
    args = ap.parse_args()

    if not re.fullmatch(r'\d{3}', args.issue_id):
        raise SystemExit('issue_id must be three digits, e.g. 011')

    body = to_markdown(extract_html(os.path.expanduser(args.eml)), args.issue_id, args.preheader)
    out_path = os.path.join(ARCHIVE_DIR, f'{args.issue_id}.md')
    with open(out_path, 'w', encoding='utf-8') as out:
        # Heading format required by AGENTS.md
        out.write(f"# 🗞️ Issue #{args.issue_id}: {args.title}\n\n")
        out.write(body)
        out.write("\n")

    print(f"Wrote {os.path.relpath(out_path, BASE_DIR)}. Review the Radar sub-headings and closing CTA before publishing.")


if __name__ == '__main__':
    main()
