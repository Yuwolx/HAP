from fastapi import APIRouter
from schemas.palette_schema import EmotionRequest, PaletteResponse
from services.palette_service import get_color_palette

router = APIRouter()

@router.post("/palette")
def get_palette(data: dict):
    secondary = data.get("secondary")

    palettes = {
        "고요함": ["#A7C7E7", "#C9DCEC", "#E8F0F7", "#F4F9FB", "#FFFFFF"],  # 맑은 하늘·평온
        "활기참": ["#FFD54F", "#FFB300", "#FF8F00", "#FF6F00", "#F57C00"],  # 태양빛·생동감
        "자유로움": ["#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00695C"],  # 바람·푸른 공간
        "감사함": ["#AED581", "#9CCC65", "#8BC34A", "#7CB342", "#689F38"],  # 자연·초록·따뜻함
        "신남": ["#FF8A80", "#FF5252", "#FF1744", "#D50000", "#C51162"],  # 강렬함·기쁨의 폭발
        "설렘": ["#F8BBD0", "#F48FB1", "#EC407A", "#E91E63", "#AD1457"],  # 사랑·두근거림
    }

    # 선택지에 없는 감정이라면 기본 톤으로 반환
    selected_palette = palettes.get(
        secondary,
        ["#E0E0E0", "#EEEEEE", "#F5F5F5", "#FAFAFA", "#FFFFFF"]
    )

    return {"colors": selected_palette}
