from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models.emotion_model import EmotionRecord

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ 1️⃣ 감정 기록 저장
@router.post("/record")
def create_record(
    primary: str,
    secondary: str,
    situation: str = "",
    color: str = "",
    user_id: str = "anonymous",  # ✅ 기본값으로 추가
    db: Session = Depends(get_db)
):
    record = EmotionRecord(
        user_id=user_id,
        primary=primary,
        secondary=secondary,
        situation=situation,
        color=color,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"message": "record saved", "record_id": record.id}


# ✅ 2️⃣ 감정 기록 조회 (새로 추가)
@router.get("/records")
def get_records(db: Session = Depends(get_db)):
    records = db.query(EmotionRecord).order_by(EmotionRecord.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "user_id": r.user_id,
            "primary": r.primary,
            "secondary": r.secondary,
            "situation": r.situation,
            "color": r.color,
            "created_at": r.created_at,
        }
        for r in records
    ]