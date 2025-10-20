from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from core.database import Base

class EmotionRecord(Base):
    __tablename__ = "emotion_records"

    id = Column(Integer, primary_key=True, index=True)
    primary = Column(String, index=True)
    secondary = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
