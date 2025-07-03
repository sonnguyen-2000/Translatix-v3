from pydantic import BaseModel
from typing import List, Optional, Literal

class RegionPosition(BaseModel):
    position: Literal["absolute"] = "absolute"
    left: int
    top: int
    width: int
    height: int

class Region(BaseModel):
    id: str
    name: str
    originalText: str
    confidence: float
    position: RegionPosition

class ComicPage(BaseModel):
    id: str
    name: str
    status: str
    imageUrl: str
    thumbnailUrl: str
    regions: List[Region] = []

class ProjectDetails(BaseModel):
    id: int
    name: str
    platform: str
    folder_path: str
    pages: List[ComicPage]
