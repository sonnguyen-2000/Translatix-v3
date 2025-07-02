// src/features/comic/ComicEditor.jsx
import { useState, useEffect } from "react";

// --- COMPONENT CON ---

// Panel bên trái: Hiển thị các trang và các vùng dịch
function LeftPanel({
  project,
  activePage,
  activeRegion,
  onPageSelect,
  onRegionSelect,
}) {
  return (
    <aside
      className="w-80 flex flex-col border-r shrink-0"
      style={{
        backgroundColor: "var(--bg-panel)",
        borderColor: "var(--border-color)",
      }}>
      <div
        className="p-4 border-b"
        style={{ borderColor: "var(--border-color)" }}>
        <h3 className="font-semibold mb-2">Danh sách trang</h3>
        <div className="h-40 overflow-y-auto space-y-2 pr-1">
          {project.pages.map((page, index) => (
            <div
              key={page.id}
              className={`p-1 rounded-md border-2 cursor-pointer ${
                page.id === activePage.id
                  ? "border-[var(--active-bg)]"
                  : "border-transparent"
              }`}
              onClick={() => onPageSelect(index)}>
              <img
                src={page.thumbnailUrl}
                alt={page.name}
                className="w-full rounded-sm"
              />
              <p className="text-xs text-center mt-1">{page.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold mb-2">Vùng dịch trên {activePage.name}</h3>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {activePage.regions.map((region) => (
              <li
                key={region.id}
                className="p-2 rounded-md cursor-pointer flex items-start gap-3"
                style={{
                  backgroundColor:
                    region.id === activeRegion?.id
                      ? "var(--active-bg)"
                      : "transparent",
                }}
                onClick={() => onRegionSelect(region.id)}>
                <span className="mt-1">{region.icon}</span>
                <div className="flex-1 overflow-hidden">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        region.id === activeRegion?.id
                          ? "white"
                          : "var(--text-primary)",
                    }}>
                    {region.name}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{
                      color:
                        region.id === activeRegion?.id
                          ? "#d1d5db"
                          : "var(--text-secondary)",
                    }}>
                    {region.originalText}
                  </p>
                </div>
                {region.note && (
                  <span className="text-yellow-400" title="Có ghi chú">
                    🗒️
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

// Panel chính giữa: Hiển thị ảnh truyện tranh
function MainViewer({ activePage, activeRegion, onRegionSelect }) {
  return (
    <main className="flex-1 flex flex-col p-4 items-center justify-center bg-bg-main">
      <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <div className="relative shadow-lg">
          <img
            src={activePage.imageUrl}
            alt={activePage.name}
            className="max-w-full max-h-full object-contain"
          />
          {activePage.regions.map((region) => (
            <div
              key={region.id}
              className="absolute cursor-pointer"
              style={{
                ...region.position,
                border: `2px ${
                  region.id === activeRegion?.id ? "solid" : "dashed"
                } ${
                  region.id === activeRegion?.id
                    ? "var(--active-bg)"
                    : "var(--border-color)"
                }`,
                backgroundColor:
                  region.id === activeRegion?.id
                    ? "rgba(59, 130, 246, 0.3)"
                    : "rgba(51, 65, 85, 0.3)",
              }}
              onClick={() => onRegionSelect(region.id)}
            />
          ))}
        </div>
      </div>
      {/* Thanh công cụ zoom... */}
    </main>
  );
}

// Panel bên phải: Hiển thị chi tiết vùng dịch và công cụ
function RightPanel({ activeRegion }) {
  if (!activeRegion)
    return (
      <aside
        className="w-96 border-l"
        style={{
          backgroundColor: "var(--bg-panel)",
          borderColor: "var(--border-color)",
        }}
      />
    );

  return (
    <aside
      className="w-96 flex flex-col border-l shrink-0"
      style={{
        backgroundColor: "var(--bg-panel)",
        borderColor: "var(--border-color)",
      }}>
      <div className="p-4 flex-1 overflow-y-auto space-y-5">
        <div>
          <h3 className="font-bold mb-2">Vùng dịch: {activeRegion.name}</h3>
        </div>
        <div>
          <label
            className="text-sm font-semibold mb-1 block"
            style={{ color: "var(--text-secondary)" }}>
            Văn bản gốc
          </label>
          <textarea
            className="w-full p-2 text-base"
            rows="2"
            readOnly
            defaultValue={activeRegion.originalText}></textarea>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              className="text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}>
              Bản dịch
            </label>
            <button
              title="Dịch tự động bằng AI"
              className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md font-semibold"
              style={{
                color: "var(--btn-bg)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}>
              ✨ Dịch tự động
            </button>
          </div>
          <textarea
            className="w-full p-2 text-base"
            rows="3"
            placeholder="Nhập bản dịch..."></textarea>
        </div>
        {/* ... Các fieldset và công cụ khác ... */}
      </div>
      <div
        className="p-4 border-t shrink-0 flex gap-4"
        style={{ borderColor: "var(--border-color)" }}>
        <button
          className="flex-1 p-3 rounded-lg font-semibold"
          style={{ backgroundColor: "var(--btn-secondary-bg)" }}>
          Áp dụng
        </button>
        <button
          className="flex-1 p-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "var(--btn-bg)" }}>
          Hoàn tất & Tiếp
        </button>
      </div>
    </aside>
  );
}

// --- COMPONENT EDITOR CHÍNH ---
export function ComicEditor({ project, onExit }) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeRegionId, setActiveRegionId] = useState(null);

  const activePage = project.pages[activePageIndex];
  const activeRegion = activePage.regions.find((r) => r.id === activeRegionId);

  // Tự động chọn vùng dịch đầu tiên khi trang thay đổi
  useEffect(() => {
    if (activePage.regions.length > 0) {
      setActiveRegionId(activePage.regions[0].id);
    }
  }, [activePage]);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <header
        className="w-full flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-color)",
        }}>
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">Translatix Comic Studio</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Dự án:</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {project.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-sm px-3 py-1 rounded-md"
            style={{ backgroundColor: "var(--btn-secondary-bg)" }}>
            Quay lại
          </button>
          <button
            className="text-sm px-3 py-1 rounded-md text-white"
            style={{ backgroundColor: "var(--btn-bg)" }}>
            Lưu & Xuất file
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          project={project}
          activePage={activePage}
          activeRegion={activeRegion}
          onPageSelect={setActivePageIndex}
          onRegionSelect={setActiveRegionId}
        />
        <MainViewer
          activePage={activePage}
          activeRegion={activeRegion}
          onRegionSelect={setActiveRegionId}
        />
        <RightPanel activeRegion={activeRegion} />
      </div>
    </div>
  );
}
