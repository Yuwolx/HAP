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

# ✏️ UPDATE (기록 수정)
@router.put("/record/{record_id}")
def update_record(
    record_id: int,
    primary: str = None,
    secondary: str = None,
    situation: str = None,
    color: str = None,
    db: Session = Depends(get_db)
):
    record = db.query(EmotionRecord).filter(EmotionRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    # 전달된 값만 수정
    if primary is not None:
        record.primary = primary
    if secondary is not None:
        record.secondary = secondary
    if situation is not None:
        record.situation = situation
    if color is not None:
        record.color = color

    db.commit()
    db.refresh(record)
    return {"message": "record updated", "record": record.id}


# 🗑️ DELETE (기록 삭제)
@router.delete("/record/{record_id}")
def delete_record(record_id: int, db: Session = Depends(get_db)):
    record = db.query(EmotionRecord).filter(EmotionRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")

    db.delete(record)
    db.commit()
    return {"message": "record deleted", "record": record_id}