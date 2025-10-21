from fastapi import APIRouter
from schemas.palette_schema import EmotionRequest, PaletteResponse
from services.palette_service import get_color_palette

router = APIRouter()

@router.post("/palette")
def get_palette(data: dict):
    secondary = data.get("secondary", "")

    base_colors = [
        "#E6B8B8", "#FAD4C0", "#FFE1A8", "#F6E7CB", "#D8E2DC",
        "#A8DADC", "#BFD8E6", "#C3CDE6", "#D7C7E9", "#EADCF8",
        "#E5D3C5", "#F3D5B5", "#EABF9F", "#C9B79C", "#B4C3A9",
        "#CFE1B9", "#E2ECE9", "#F1E5D1", "#E9CFCF", "#F6E5E5",
    ]

    palette_map = {
        "고요함": ["#D8E2DC", "#C3CDE6", "#E2ECE9", "#E5D3C5", "#F1E5D1"],
        "활기참": ["#E6B8B8", "#A8DADC", "#BFD8E6", "#CFE1B9", "#D7C7E9"],
        "자유로움": ["#A8DADC", "#BFD8E6", "#CFE1B9", "#E2ECE9", "#D7C7E9"],
        "감사함": ["#E5D3C5", "#EABF9F", "#C9B79C", "#F1E5D1", "#F3D5B5"],
        "신남": ["#E6B8B8", "#FAD4C0", "#FFE1A8", "#EABF9F", "#E9CFCF"],
        "설렘": ["#D7C7E9", "#EADCF8", "#E6B8B8", "#F6E5E5", "#FAD4C0"],
    }

    colors = palette_map.get(secondary, base_colors[:5])
    return {"colors": colors}
