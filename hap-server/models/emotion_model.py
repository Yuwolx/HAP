from sqlalchemy import Column, Integer, String, DateTime, func
from core.database import Base

class EmotionRecord(Base):
    __tablename__ = "emotion_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # ✅ 추가: 사용자 식별자
    primary = Column(String)
    secondary = Column(String)
    situation = Column(String)
    color = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
