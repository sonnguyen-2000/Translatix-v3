# app/features/comic/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from . import service, schemas
from pydantic import BaseModel # Import BaseModel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dùng lại schema từ file schema, hoặc định nghĩa ở đây nếu muốn
class OpenProjectRequest(BaseModel):
    folder_path: str

# Cập nhật response_model để trả về cấu trúc chi tiết
@router.post("/comic/open", response_model=schemas.ProjectDetails, tags=["Comic"])
async def open_comic_project(request: OpenProjectRequest, db: Session = Depends(get_db)):
    """Mở một thư mục dự án Comic, quét file và xử lý trang đầu tiên."""
    try:
        project_details = service.initialize_comic_project(db=db, folder_path=request.folder_path)
        if project_details.get("error"):
             raise HTTPException(status_code=404, detail=project_details["error"])
        return project_details
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))