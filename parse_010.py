import email
from email import policy
from html.parser import HTMLParser
import re

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
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', 'image')
            if 'http' in src and 'twitter' not in src.lower() and 'linkedin' not in src.lower() and 'loops.so/api' not in src and 'poweredbyloops' not in src and 'c.vialoops.com' not in src:
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

filepath = '/Users/menilvukovic/Downloads/Issue #010_ CVE Season_ Auditing, Patching, and Zero-Day Hunting.eml'
with open(filepath, 'rb') as f:
    msg = email.message_from_binary_file(f, policy=policy.default)

html_content = ""
for part in msg.walk():
    if part.get_content_type() == 'text/html':
        html_content = part.get_content()
        break

parser = SimpleHTMLToMD()
parser.feed(html_content)

text = "".join(parser.md)

# Remove zero-width characters / preview text
text = re.sub(r'[\u200b\u200c\u200d\u2060\ufeff\u00ad\u2007\u034f]+', '', text)
text = text.replace("You're being hacked... If not start preventing with these 15 tools", "").strip()

# Truncate loops footer starting at "How did we do this week?"
if "How did we do this week?" in text:
    text = text.split("How did we do this week?")[0].strip()

# Clean excessive newlines
text = re.sub(r'\n{3,}', '\n\n', text)

with open('public/archive/010.md', 'w', encoding='utf-8') as out:
    out.write("# 🗞️ Issue #010: CVE Season: Auditing, Patching, and Zero-Day Hunting\n\n")
    out.write(text.strip())
    out.write("\n")

print("Created raw 010.md!")
