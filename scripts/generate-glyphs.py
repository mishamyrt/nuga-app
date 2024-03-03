from fontTools import subset
from fontTools.ttLib import TTFont

INPUT_PATH = "/Library/Fonts/SF-Pro-Display-Semibold.otf"
OUTPUT_PATH = "./frontend/src/assets/fonts/Nuga-glyphs.otf"
TARGET_GLYPHS = [
    '2325', # ⌥
    '2318', # ⌘
    '21E7', # ⇧
    '2303', # ⌃
    '232B' # ⌫,
    '2191', # ↑
    '2193', # ↓
    '2192', # →
    '2190', # ←
    '2423', # ␣
    '21B5', # ↵
]
TARGET_NAME = "Nuga Glyphs"

def render_subset(input_path, output_path, glyphs):
    """Renders font subset to file"""
    subset_args = [
        input_path,
        f"--unicodes={','.join(glyphs)}",
        "--no-layout-closure",
        f"--output-file={output_path}",
    ]
    subset.main(subset_args)

def rename_font(font_path):
    """Renames font"""
    font = TTFont(font_path)
    nameIDs = [1, 2, 4, 6]
    for record in font['name'].names:
        if record.nameID in nameIDs:
            if record.isUnicode():
                record.string = TARGET_NAME.encode('utf-16-be')
            else:
                record.string = TARGET_NAME.encode('latin1')
    font.save(font_path)



render_subset(INPUT_PATH, OUTPUT_PATH, TARGET_GLYPHS)
rename_font(OUTPUT_PATH)
