from fastapi import APIRouter
from schemas.palette_schema import EmotionRequest, PaletteResponse
from services.palette_service import get_color_palette

router = APIRouter()

@router.post("/palette", response_model=PaletteResponse)
def palette_api(request: EmotionRequest):
    colors = get_color_palette(request.primary, request.secondary)
    return {"colors": colors}
