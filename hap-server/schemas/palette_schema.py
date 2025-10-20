from pydantic import BaseModel

class EmotionRequest(BaseModel):
    primary: str
    secondary: str

class PaletteResponse(BaseModel):
    colors: list[str]
