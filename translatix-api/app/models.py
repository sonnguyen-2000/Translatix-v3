# app/models.py
from sqlalchemy import Column, Integer, String
from .database import Base # Cần import Base từ database

# ✅ Đảm bảo bạn có class Project được định nghĩa như thế này
class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    platform = Column(String) # 'comic', 'rpg', 'unity', 'unreal'
    folder_path = Column(String, unique=True)

# Trong tương lai, bạn sẽ thêm các class model khác (Pages, Regions,...) vào file này.