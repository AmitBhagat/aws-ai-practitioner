import re
import os

file_path = r"e:\Projects\aws-ai-practitioner\manuscript.txt"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

matches = list(re.finditer(r"hey\s+this\s+is\s+([A-Za-z\s]+)", text, re.IGNORECASE))

output_dir = r"e:\Projects\aws-ai-practitioner\sections"
os.makedirs(output_dir, exist_ok=True)

print("Splitting manuscript into sections...")
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else len(text)
    section_content = text[start:end].strip()
    
    section_file = os.path.join(output_dir, f"section_{i:02d}.txt")
    with open(section_file, "w", encoding="utf-8") as sf:
        sf.write(section_content)

print(f"Successfully split into {len(matches)} sections in {output_dir}")
