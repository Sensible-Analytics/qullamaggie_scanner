import os
from bs4 import BeautifulSoup

INPUT_DIR = "/Users/prabhatranjan/IdeaProjects/qullamaggie_scanner/website"
OUTPUT_DIR = "/Users/prabhatranjan/IdeaProjects/qullamaggie_scanner/website/extracted_text"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_text_from_html(html_path):
    try:
        with open(html_path, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()
    except Exception as e:
        print(f"Error reading {html_path}: {e}")
        return ""

    soup = BeautifulSoup(html, "lxml")

    # Remove scripts, styles, navbars, etc.
    for tag in soup(["script", "style", "noscript", "header", "footer", "nav"]):
        tag.decompose()

    text = soup.get_text(separator="\n", strip=True)
    return text


def process_folder(input_dir, output_dir):
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.lower().endswith((".html", ".htm")):
                html_path = os.path.join(root, file)

                # Preserve folder structure
                rel_path = os.path.relpath(html_path, input_dir)
                txt_path = os.path.join(output_dir, rel_path + ".txt")

                os.makedirs(os.path.dirname(txt_path), exist_ok=True)

                text = extract_text_from_html(html_path)

                with open(txt_path, "w", encoding="utf-8") as out:
                    out.write(text)

                print(f"Extracted: {rel_path}")


process_folder(INPUT_DIR, OUTPUT_DIR)
print("Done! All text extracted to:", OUTPUT_DIR)
