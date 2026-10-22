import re

with open('public/archive/010.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix space between emoji and parenthesis in Sandbox headers
text = text.replace("### 1. Trivy 🛡️(", "### 1. Trivy 🛡️ (")
text = text.replace("### 2. Nuclei ⚡(", "### 2. Nuclei ⚡ (")
text = text.replace("### 3. OSV-Scanner 🔍(", "### 3. OSV-Scanner 🔍 (")

# Ensure Radar list items have hyphens
text = re.sub(r'\n\s*([a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+\s+\(~.*?Stars\)\s+-)', r'\n- \1', text)

# Update ending CTA to Option 1 (social links + sign-off)
old_cta = "I'd love to hear what CLI tools or pre-commit workflows you swear by to cut down on dependency noise. Hit reply and let me know—I read every single email."
new_cta = "I'd love to hear what CLI tools or pre-commit workflows you swear by to cut down on dependency noise—reach out on [X (Twitter)](https://twitter.com/MenilVukovic) or [LinkedIn](https://linkedin.com/in/menilv) and let me know!\n\nUntil next Thursday, keep your servers close and support your local maintainers."

text = text.replace(old_cta, new_cta)

# Normalize newlines
text = re.sub(r'\n{3,}', '\n\n', text)

with open('public/archive/010.md', 'w', encoding='utf-8') as f:
    f.write(text.strip() + '\n')

print("Fixed 010.md formatting!")
