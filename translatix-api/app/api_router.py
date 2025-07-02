# app/api_router.py
from fastapi import APIRouter
from .features.comic.router import router as comic_router
# from .features.rpg import router as rpg_router # Sẽ thêm sau

router = APIRouter()

# Gộp router của từng feature vào router tổng
router.include_router(comic_router)
# router.include_router(rpg_router) # Sẽ thêm sau