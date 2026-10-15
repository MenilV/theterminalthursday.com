import re

with open('public/archive/009.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove invisible preview text / zero-width spaces
text = re.sub(r'[\u200b\u200c\u200d\u2060\ufeff\u00ad\u2007\u034f]+', '', text)

# Fix Sandbox section header
text = text.replace("🔬 The Sandbox: 3 Projects I Tested This Week", "## 🔬 The Sandbox: 3 Projects I Tested This Week")

# Fix project headers in Sandbox
text = text.replace("1. Cutter ✂️ (Reverse Engineering Platform)", "### 1. Cutter ✂️ (Reverse Engineering Platform)")
text = text.replace("2. OSS-Fuzz 👾 (Continuous Fuzzing)", "### 2. OSS-Fuzz 👾 (Continuous Fuzzing)")
text = text.replace("3. Ghidra 🐉 (SRE Framework)", "### 3. Ghidra 🐉 (SRE Framework)")

# Fix Curious Non-Dev section
text = text.replace("☕ The Curious Non-Dev: No Code Required", "## ☕ The Curious Non-Dev: No Code Required")

# Fix The Radar section
text = text.replace("📡 The Radar: 12 More Projects to Spin Up This Weekend", "## 📡 The Radar: 12 More Projects to Spin Up This Weekend")
text = text.replace("🛠️ The Framework Integrations", "### 🛠️ The Framework Integrations")
text = text.replace("🐛 Fuzzing & Protocol Analysis", "### 🐛 Fuzzing & Protocol Analysis")
text = text.replace("🧠 Symbolic Execution & Analysis", "### 🧠 Symbolic Execution & Analysis")

# Fix Closing Thoughts
text = text.replace("🏗️ Closing Thoughts", "## 🏗️ Closing Thoughts")

# Format Radar list items
text = re.sub(r'\n([a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+\s+\(~.*?Stars\)\s+-.*?\n)', r'\n- \1', text)
text = re.sub(r'\n(wader/fq\s+\(~.*?Stars\)\s+-.*?\n)', r'\n- \1', text)

# Clean excessive newlines (more than 2 newlines -> 2 newlines)
text = re.sub(r'\n{3,}', '\n\n', text)

with open('public/archive/009.md', 'w', encoding='utf-8') as f:
    f.write(text.strip() + '\n')

print("Fixed 009.md headers and formatting!")
