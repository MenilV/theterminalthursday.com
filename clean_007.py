import re

with open('public/archive/007.md', 'r') as f:
    text = f.read()

# Remove loops tracking pixels and stuff
text = re.sub(r'!\[.*?\]\(https://c\.vialoops\.com.*?\)\n+', '', text)
text = re.sub(r'!\[Loops\.so\]\(https://app\.loops\.so/.*?\.png\)\n+', '', text)
text = text.replace("![None]", "![Image]")
text = text.replace("Issue #007: The Mobile Dev Blueprint", "", 1).strip()
text = text.replace("# 🗞️ \n\n", "# 🗞️ Issue #007: The Mobile Dev Blueprint\n\n")

# Remove footer
text = text.split('How did we do this week?')[0].strip()

# Add a newline at the end
text += '\n'

with open('public/archive/007.md', 'w') as f:
    f.write(text)
