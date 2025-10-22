from fastapi import FastAPI
from routers.palette_router import router as palette_router
from core.config import setup_cors
from models.emotion_model import EmotionRecord


app = FastAPI()

# CORS 설정
setup_cors(app)

# 라우터 등록
app.include_router(palette_router)

@app.get("/health")
def health():
    return {"status": "ok"}

from core.database import Base, engine
from models.emotion_model import EmotionRecord

# ✅ 테이블 자동 생성 (처음 한 번만 실행됨)
Base.metadata.create_all(bind=engine)

from routers.record_router import router as record_router
app.include_router(record_router)
