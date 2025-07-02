# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Đường dẫn đến file database SQLite.
DATABASE_URL = "sqlite:///./translatix.db"

# create_engine là điểm khởi đầu của SQLAlchemy
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# DÒNG QUAN TRỌNG: Đảm bảo bạn có dòng này.
# Nó tạo ra một "nhà máy" sản xuất các phiên làm việc với database.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class để các model kế thừa
Base = declarative_base()