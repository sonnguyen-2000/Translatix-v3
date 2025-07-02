from sqlalchemy.orm import Session
from paddleocr import PaddleOCR
from app import crud
import os
import cv2

# Khởi tạo PaddleOCR
print("\u0110ang tải model PaddleOCR cho Comic...")
ocr_instance = PaddleOCR(  # Đổi thành False do không dùng song song với use_textline_orientation
    lang='en',
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False
)
print("Model Comic đã tải xong.")

def analyze_image_page(image_path: str):
    """
    Phân tích ảnh và xử lý định dạng kết quả dạng DICTIONARY từ PaddleOCR.
    """
    if not os.path.exists(image_path):
        print(f"❌ File không tồn tại: {image_path}")
        return []

    try:
        # Sử dụng cv2 để đọc ảnh, giúp tương thích tốt hơn
        img = cv2.imread(image_path)
        if img is None:
            print(f"❌ Không đọc được ảnh: {image_path}")
            return []
    except Exception as e:
        print(f"❌ Lỗi khi đọc file ảnh: {e}")
        return []

    try:
        # Chạy OCR, nó sẽ trả về một list chứa 1 dict lớn
        result = ocr_instance.ocr(img)
        print(f"📦 Kết quả OCR từ {image_path} đã nhận.")
        # print(f"Raw result: {result}") # Bỏ comment dòng này nếu muốn xem chi tiết kết quả thô
    except Exception as e:
        print(f"❌ Lỗi khi chạy OCR: {e}")
        return []

    regions = []
    
    # ✅ SỬA Ở ĐÂY: Xử lý cấu trúc kết quả dạng dictionary
    # Kiểm tra result có hợp lệ và chứa dữ liệu không
    if result and result[0] and isinstance(result[0], dict):
        # Lấy dictionary dữ liệu từ phần tử đầu tiên của result
        ocr_data = result[0]
        
        # Lấy các danh sách cần thiết từ dictionary
        boxes = ocr_data.get('dt_polys', [])
        texts = ocr_data.get('rec_texts', [])
        scores = ocr_data.get('rec_scores', [])

        # Kiểm tra xem các thành phần có đồng bộ không
        if not (len(boxes) == len(texts) == len(scores)):
            print("⚠️ Lỗi không đồng bộ dữ liệu trong kết quả OCR.")
            return []

        # Lặp qua các kết quả bằng index
        for idx, box in enumerate(boxes):
            try:
                text = texts[idx]
                confidence = scores[idx]
                
                # Bỏ qua các kết quả không có chữ hoặc độ tin cậy thấp
                if not text or confidence < 0.3:
                    continue

                # Lấy tọa độ từ bounding box
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
                # Bỏ qua nếu có lỗi không đồng bộ hoặc sai kiểu dữ liệu
                print(f"⚠️ Lỗi khi xử lý dòng OCR: {e}")
                continue
            
    return regions

def initialize_comic_project(db: Session, folder_path: str):
    """
    Khởi tạo project Comic, phân tích ảnh đầu tiên.
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

    response_data = {
        "id": project.id,
        "name": project.name,
        "platform": project.platform,
        "folder_path": project.folder_path,
        "pages_overview": [
            {"id": f"page-{i+1}", "name": name, "status": "unprocessed"}
            for i, name in enumerate(image_files)
        ],
        "initial_page_data": None
    }

    if image_files:
        first_image_path = os.path.join(folder_path, image_files[0])
        print(f"🚀 Đang xử lý ảnh đầu tiên: {first_image_path}")
        regions = analyze_image_page(first_image_path)

        response_data["pages_overview"][0]["status"] = "processed"
        response_data["initial_page_data"] = {
            "id": "page-1",
            "name": image_files[0],
            "regions": regions
        }

    return response_data