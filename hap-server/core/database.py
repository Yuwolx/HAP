from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ 개발 단계에서는 SQLite 사용 (파일 기반, 간단하고 빠름)
# 👉 나중에 PostgreSQL로 교체 시 URL만 변경하면 됨.
DATABASE_URL = "sqlite:///./hap.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
