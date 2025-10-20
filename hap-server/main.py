from fastapi import FastAPI
from routers.palette_router import router as palette_router
from core.config import setup_cors

app = FastAPI()

# CORS 설정
setup_cors(app)

# 라우터 등록
app.include_router(palette_router)

@app.get("/health")
def health():
    return {"status": "ok"}
