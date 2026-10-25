import json
from pathlib import Path

ROOT = Path(__file__).parent
TOKENS = json.loads((ROOT / "tokens.json").read_text())
COLORS = TOKENS["color"]

TEMPLATE = """
QPushButton[polarControl="button"] { min-height: 18px; padding: 9px 14px; border: 1px solid @border; border-radius: @control-radius; background: @surface; color: @text; font-weight: 600; }
QPushButton[polarControl="button"]:hover { background: @soft; border-color: @accent; }
QPushButton[polarControl="button"]:pressed { background: @border; }
QPushButton[polarControl="button"]:focus { border: 2px solid @accent; padding: 8px 13px; }
QPushButton[polarVariant="primary"] { background: @accent; color: white; border-color: @accent; }
QPushButton[polarVariant="primary"]:hover { background: @accentHover; }
QPushButton[polarVariant="danger"] { color: @danger; }
QPushButton[polarVariant="ghost"] { background: transparent; border-color: transparent; }
QPushButton[polarControl="button"]:disabled { background: @soft; color: @disabled; border-color: @border; }
QLineEdit[polarControl="input"] { min-height: 20px; padding: 8px 12px; border: 1px solid @border; border-radius: @control-radius; background: @surface; color: @text; selection-background-color: @accent; }
QLineEdit[polarControl="input"]:focus { border: 2px solid @accent; padding: 7px 11px; }
QLineEdit[polarControl="input"][invalid="true"] { border-color: @danger; }
QLineEdit[polarControl="input"]:disabled { color: @disabled; background: @soft; }
QComboBox[polarControl="select"] { min-height: 20px; padding: 8px 36px 8px 12px; border: 1px solid @border; border-radius: @control-radius; color: @text; background: @surface; }
QComboBox[polarControl="select"]:hover { border-color: @accent; background: #f9fcff; }
QComboBox[polarControl="select"]:focus { border: 2px solid @accent; padding: 7px 35px 7px 11px; }
QComboBox[polarControl="select"]:disabled { color: @disabled; background: @soft; }
QComboBox[polarControl="select"]::drop-down { border: none; width: 30px; }
QComboBox[polarControl="select"]::down-arrow { image: url(ARROW); width: 14px; height: 14px; }
QListView[polarControl="options"] { background: @surface; color: @text; border: 1px solid @border; border-radius: @control-popupRadius; padding: 5px; outline: 0; }
QCheckBox[polarControl="checkbox"] { spacing: 8px; color: @text; padding: 3px 0; }
QCheckBox[polarControl="checkbox"]::indicator { width: 18px; height: 18px; border: 1px solid @border; border-radius: 5px; background: @surface; }
QCheckBox[polarControl="checkbox"]::indicator:checked { background: @accent; border-color: @accent; image: url(CHECK); }
QCheckBox[polarControl="checkbox"]:focus { color: @accent; }
QCheckBox[polarControl="checkbox"]::indicator:focus { border: 2px solid @accent; }
QCheckBox[polarControl="checkbox"]::indicator:disabled { background: @soft; border-color: @border; }
QCheckBox[polarControl="checkbox"]:disabled { color: @disabled; }
QLabel[polarControl="label"] { color: @muted; font-size: @type-label; font-weight: 600; }
QLabel[polarControl="helper"] { color: @muted; font-size: @type-helper; }
QLabel[polarControl="error"] { color: @danger; font-size: @type-helper; }
"""

def stylesheet():
    result = TEMPLATE
    for key in sorted(COLORS, key=len, reverse=True):
        result = result.replace("@"+key, COLORS[key])
    for group in ("control", "type", "space"):
        for key, value in TOKENS[group].items():
            result = result.replace("@"+group+"-"+key, str(value)+"px")
    return result.replace("ARROW", (ROOT/"assets/chevron.svg").as_posix()).replace("CHECK", (ROOT/"assets/check.svg").as_posix())
