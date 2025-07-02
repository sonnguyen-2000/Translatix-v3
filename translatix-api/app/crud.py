# app/crud.py
from sqlalchemy.orm import Session
from . import models
from .features.comic import schemas as comic_schemas # Ví dụ import schema
import os

def create_project_if_not_exists(db: Session, folder_path: str, platform: str):
    """
    Kiểm tra dự án theo đường dẫn, nếu chưa có thì tạo mới.
    """
    existing_project = db.query(models.Project).filter(models.Project.folder_path == folder_path).first()
    if existing_project:
        return existing_project

    project_name = os.path.basename(folder_path)
    db_project = models.Project(
        name=project_name, 
        platform=platform, 
        folder_path=folder_path
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project