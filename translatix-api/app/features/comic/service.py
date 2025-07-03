from sqlalchemy.orm import Session
from paddleocr import PaddleOCR
from app import crud
import os
import cv2

# Khởi tạo PaddleOCR
print("📦 Đang tải model PaddleOCR cho Comic...")
ocr_instance = PaddleOCR(
    lang='en',
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False
)
print("✅ Model PaddleOCR đã sẵn sàng.")

def analyze_image_page(image_path: str):
    """
    Phân tích ảnh bằng PaddleOCR và trả về danh sách vùng text.
    """
    if not os.path.exists(image_path):
        print(f"❌ File không tồn tại: {image_path}")
        return []

    try:
        img = cv2.imread(image_path)
        if img is None:
            print(f"❌ Không thể đọc ảnh: {image_path}")
            return []
    except Exception as e:
        print(f"❌ Lỗi khi đọc ảnh: {e}")
        return []

    try:
        result = ocr_instance.ocr(img)
        print(f"✅ OCR thành công: {image_path}")
    except Exception as e:
        print(f"❌ Lỗi khi chạy OCR: {e}")
        return []

    regions = []

    if result and result[0] and isinstance(result[0], dict):
        ocr_data = result[0]
        boxes = ocr_data.get('dt_polys', [])
        texts = ocr_data.get('rec_texts', [])
        scores = ocr_data.get('rec_scores', [])

        if not (len(boxes) == len(texts) == len(scores)):
            print("⚠️ Lỗi không đồng bộ dữ liệu OCR.")
            return []

        for idx, box in enumerate(boxes):
            try:
                text = texts[idx]
                confidence = scores[idx]

                if not text or confidence < 0.3:
                    continue

                top_left = box[0]
                bottom_right = box[2]

                region_data = {
                    "id": f"region-{idx}",
                    "position": {
                        "x": int(top_left[0]),
                        "y": int(top_left[1]),
                        "width": int(bottom_right[0] - top_left[0]),
                        "height": int(bottom_right[1] - top_left[1])
                    },
                    "source_text": text,
                    "confidence": round(float(confidence), 2)
                }
                regions.append(region_data)

            except (IndexError, TypeError) as e:
                print(f"⚠️ Lỗi khi xử lý kết quả OCR: {e}")
                continue

    return regions

def initialize_comic_project(db: Session, folder_path: str):
    """
    Khởi tạo project Comic, quét folder ảnh và xử lý ảnh đầu tiên.
    """
    project = crud.create_project_if_not_exists(
        db=db,
        folder_path=folder_path,
        platform="comic"
    )

    supported_extensions = ['.png', '.jpg', '.jpeg', '.webp']
    try:
        all_files = os.listdir(folder_path)
        image_files = sorted([
            f for f in all_files
            if os.path.splitext(f)[1].lower() in supported_extensions
        ])
    except FileNotFoundError:
        return {"error": "Thư mục không tồn tại"}

    def to_image_url(file_name):
        return f"file://{os.path.join(folder_path, file_name).replace('\\', '/')}"

    pages_data = []

    for i, name in enumerate(image_files):
        image_path = os.path.join(folder_path, name)
        image_url = to_image_url(name)
        status = "unprocessed"
        regions = []

        if i == 0:
            status = "processed"
            raw_regions = analyze_image_page(image_path)
            regions = [
                {
                    "id": r["id"],
                    "name": r["id"],
                    "originalText": r["source_text"],
                    "confidence": r["confidence"],
                    "position": {
                        "position": "absolute",
                        "left": r["position"]["x"],
                        "top": r["position"]["y"],
                        "width": r["position"]["width"],
                        "height": r["position"]["height"]
                    }
                }
                for r in raw_regions
            ]

        pages_data.append({
            "id": f"page-{i + 1}",
            "name": name,
            "status": status,
            "imageUrl": image_url,
            "thumbnailUrl": image_url,
            "regions": regions
        })

    return {
        "id": project.id,
        "name": project.name,
        "platform": project.platform,
        "folder_path": project.folder_path,
        "pages": pages_data
    }
