// src/pages/platformData.js
export const platformData = {
  rpg: {
    id: "rpg",
    icon: "🎮",
    title: "Dịch Game RPG",
    description: "Cốt truyện, nhiệm vụ, vật phẩm...",
    modalTitle: "Mở File Game RPG",
    modalDescription:
      "Chọn file thực thi (.exe) hoặc file dữ liệu chính của game bạn muốn dịch. Hệ thống sẽ tự động phân tích cấu trúc.",
  },
  unity: {
    id: "unity",
    icon: "🧩",
    title: "Dịch Game Unity",
    description: "Ngôn ngữ, UI/UX và nội dung...",
    modalTitle: "Mở Dự Án Unity",
    modalDescription:
      "Chọn file Assembly-CSharp.dll hoặc các file chứa văn bản (resources.assets) từ thư mục _Data của game.",
  },
  unreal: {
    id: "unreal",
    icon: "🎯",
    title: "Dịch Game Unreal",
    description: "Dự án Unreal Engine chuyên sâu...",
    modalTitle: "Mở Dự Án Unreal Engine",
    modalDescription:
      "Chọn file .pak của game. Công cụ sẽ cố gắng giải nén và tìm các tệp văn bản định dạng .locres.",
  },
  comic: {
    id: "comic",
    icon: "📚",
    title: "Dịch Truyện Tranh",
    description: "Lời thoại, hiệu ứng âm thanh...",
    modalTitle: "Chọn File Truyện Tranh",
    modalDescription:
      "Tải lên các file ảnh (JPG, PNG, WEBP) hoặc một file nén (ZIP, CBZ) chứa các trang truyện cần dịch.",
  },
};
