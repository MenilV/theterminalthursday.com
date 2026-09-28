import email
from email import policy
from html.parser import HTMLParser
import os

class SimpleHTMLToMD(HTMLParser):
    def __init__(self):
        super().__init__()
        self.md = []
        self.current_tag = None
        self.ignore_tags = ['style', 'script']

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attrs_dict = dict(attrs)
        
        if tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', 'image')
            if 'http' in src and 'twitter' not in src.lower() and 'linkedin' not in src.lower() and 'loops.so/api' not in src:
                self.md.append(f"\n\n![{alt}]({src})\n\n")

    def handle_endtag(self, tag):
        if tag in ['p', 'h1', 'h2', 'h3', 'li', 'div']:
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

filepath = '/Users/menilvukovic/Downloads/[PREVIEW] Issue #007_ The Mobile Dev Blueprint.eml'
with open(filepath, 'rb') as f:
    msg = email.message_from_binary_file(f, policy=policy.default)

html_content = ""
for part in msg.walk():
    if part.get_content_type() == 'text/html':
        html_content = part.get_content()
        break

parser = SimpleHTMLToMD()
parser.feed(html_content)

with open('public/archive/007.md', 'w') as out:
    out.write("# 🗞️ Issue #007: The Mobile Dev Blueprint\n\n")
    out.write("".join(parser.md))

print("Created 007.md!")
