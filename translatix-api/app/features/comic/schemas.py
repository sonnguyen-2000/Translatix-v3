# app/features/comic/schemas.py
from pydantic import BaseModel
from typing import List, Optional # Import Optional

class Region(BaseModel):
    id: str
    source_text: str
    confidence: Optional[float] = None # ✅ SỬA Ở ĐÂY: Thêm Optional

# ... các class khác giữ nguyên ...
class PageData(BaseModel):
    id: str
    name: str
    regions: List[Region]

class PageOverview(BaseModel):
    id: str
    name: str
    status: str

class ProjectDetails(BaseModel):
    id: int
    name: str
    platform: str
    folder_path: str
    pages_overview: List[PageOverview]
    initial_page_data: Optional[PageData] = None

    class Config:
        from_attributes = True