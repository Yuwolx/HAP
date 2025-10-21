from datetime import datetime, timezone, timedelta
from sqlalchemy import Column, Integer, String, DateTime
from core.database import Base

# ✅ 한국 표준시 (KST) 시간대 설정
KST = timezone(timedelta(hours=9))

class EmotionRecord(Base):
    __tablename__ = "emotion_records"

    id = Column(Integer, primary_key=True, index=True)
    primary = Column(String, nullable=False)
    secondary = Column(String, nullable=False)
    situation = Column(String, default="")
    color = Column(String, default="")
    user_id = Column(String, default="anonymous")

    # ✅ UTC 대신 KST 기준으로 저장되도록 설정
    created_at = Column(DateTime, default=lambda: datetime.now(KST))
