// src/pages/HomePage.jsx

import { platformData } from "./platformData"; // Import dữ liệu platform

// Component Card không thay đổi
function PlatformCard({ platform, onSelect, disabled }) {
  return (
    <div
      className="card p-6 md:p-8 flex flex-col text-center rounded-2xl border"
      style={{
        backgroundColor: "var(--bg-panel)",
        borderColor: "var(--border-color)",
      }}>
      <div className="flex-grow">
        <div className="flex items-center justify-center h-16 w-16 bg-black/10 rounded-full mx-auto mb-6">
          <span role="img" className="text-3xl">
            {platform.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{platform.title}</h3>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          {platform.description}
        </p>
      </div>
      <button
        onClick={() => onSelect(platform.id)}
        disabled={disabled}
        className="w-full p-3 rounded-full font-semibold"
        style={{
          backgroundColor: disabled
            ? "var(--btn-secondary-bg)"
            : "var(--btn-bg)",
          color: disabled ? "var(--text-secondary)" : "white",
          cursor: disabled ? "not-allowed" : "pointer",
        }}>
        {disabled ? "Sắp có" : "Bắt đầu"}
      </button>
    </div>
  );
}

// Component HomePage được cập nhật để nhận prop onPlatformSelect
export function HomePage({ onPlatformSelect }) {
  const platforms = Object.values(platformData);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Chọn Nền Tảng Dịch Thuật
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto mb-16"
          style={{ color: "var(--text-secondary)" }}>
          Giải pháp bản địa hóa chuyên nghiệp cho các dự án game và truyện tranh
          của bạn.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((p) => (
            <PlatformCard
              key={p.id}
              platform={p}
              onSelect={onPlatformSelect}
              disabled={false} // Thay đổi thành true nếu muốn vô hiệu hóa nút
            />
          ))}
        </div>
      </main>
    </div>
  );
}
