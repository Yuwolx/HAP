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

@router.post("/record")
def create_record(primary: str, secondary: str, db: Session = Depends(get_db)):
    record = EmotionRecord(primary=primary, secondary=secondary)
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"message": "record saved", "record_id": record.id}
