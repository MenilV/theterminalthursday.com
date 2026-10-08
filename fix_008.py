import re

with open('public/archive/008.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Sandbox headers
text = text.replace("🔬 The Sandbox: 3 Projects I Tested This Week", "## 🔬 The Sandbox: 3 Projects I Tested This Week")
text = re.sub(r'(\d\.\s+.*?)\s+What is it\?', r'### \1\n\nWhat is it?', text)

# Fix other main sections
text = text.replace("☕ The Curious Non-Dev: No Code Required", "## ☕ The Curious Non-Dev: No Code Required")
text = text.replace("📡 The Radar: 12 More Projects to Spin Up This Weekend", "## 📡 The Radar: 12 More Projects to Spin Up This Weekend")
text = text.replace("🏗️ Closing Thoughts", "## 🏗️ Closing Thoughts")

# Fix sub-sections in Radar
text = text.replace("💼 Financial Infrastructure & Accounting", "### 💼 Financial Infrastructure & Accounting")
text = text.replace("📈 Business Intelligence & Economics", "### 📈 Business Intelligence & Economics")
text = text.replace("🏢 Operations & Workflow", "### 🏢 Operations & Workflow")

# Fix lists in Radar
text = re.sub(r'\n(.*?\(.*?\+ Stars\).*?)\n', r'\n- \1\n', text)

with open('public/archive/008.md', 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed headers!")
