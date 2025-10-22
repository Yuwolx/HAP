from datetime import datetime, timezone, timedelta
from sqlalchemy import Column, Integer, String, DateTime
from core.database import Base

KST = timezone(timedelta(hours=9))

class EmotionRecord(Base):
    __tablename__ = "emotion_records"

    id = Column(Integer, primary_key=True, index=True)
    primary = Column(String, nullable=False)
    secondary = Column(String, nullable=False)
    situation = Column(String, default="")
    color = Column(String, default="")
    location = Column(String, default="")  # ✅ 새 컬럼
    user_id = Column(String, default="anonymous")
    created_at = Column(DateTime, default=lambda: datetime.now(KST))
