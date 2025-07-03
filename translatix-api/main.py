# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ SỬA Ở ĐÂY: Dùng import tuyệt đối
from app import database, models 
from app.api_router import router as api_router

# Dòng này sẽ tạo ra file database và các bảng
# Nó dùng `database.Base` đã được import đúng ở trên
database.Base.metadata.create_all(bind=database.engine)

# --- Khởi tạo ứng dụng FastAPI ---
app = FastAPI(title="Translatix API")

# --- Cấu hình CORS ---
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Kết nối router tổng ---
app.include_router(api_router, prefix="/api")

# --- Endpoint gốc ---
@app.get("/")
def read_root():
    return {"message": "Welcome to Translatix API"}