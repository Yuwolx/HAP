import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../hap-ai")))
from palette import get_palette

def get_color_palette(primary: str, secondary: str):
    return get_palette(primary, secondary)
