// src/features/unity/UnityEditor.jsx
import { useState, useMemo } from "react";

// --- COMPONENT CON ---
const StatusIndicator = ({ status }) => {
  const colorMap = {
    done: "bg-green-400",
    review: "bg-yellow-400",
    todo: "bg-slate-500",
  };
  return (
    <span
      className={`w-2 h-2 rounded-full ${
        colorMap[status] || "bg-slate-500"
      }`}></span>
  );
};

// --- EDITOR CHÍNH ---
export function UnityEditor({ project, onExit }) {
  const [activeTableId, setActiveTableId] = useState(project.tables[1].id);
  const [activeKeyId, setActiveKeyId] = useState(project.tables[1].keys[1].id);

  const activeTable = useMemo(
    () => project.tables.find((t) => t.id === activeTableId),
    [project.tables, activeTableId]
  );

  const activeKey = useMemo(
    () => activeTable?.keys.find((k) => k.id === activeKeyId),
    [activeTable?.keys, activeKeyId]
  );

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <header
        className="w-full flex items-center justify-between px-4 py-2 border-b shrink-0"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-color)",
        }}>
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">Translatix Unity Editor</h1>
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
        {/* === Cột Trái: Bảng và Khóa === */}
        <aside
          className="w-96 flex flex-col border-r"
          style={{
            backgroundColor: "var(--bg-panel)",
            borderColor: "var(--border-color)",
          }}>
          <div
            className="p-4 border-b"
            style={{ borderColor: "var(--border-color)" }}>
            <h3 className="font-semibold mb-2">Bảng Dữ liệu (Tables)</h3>
            <ul className="space-y-1">
              {project.tables.map((table) => (
                <li
                  key={table.id}
                  onClick={() => setActiveTableId(table.id)}
                  className="p-2 flex items-center justify-between rounded-md cursor-pointer"
                  style={{
                    backgroundColor:
                      table.id === activeTableId
                        ? "var(--active-bg)"
                        : "transparent",
                  }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    <span
                      className={`font-medium text-sm ${
                        table.id === activeTableId ? "text-white" : ""
                      }`}>
                      {table.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      table.id === activeTableId ? "bg-white/20 text-white" : ""
                    }`}
                    style={{
                      backgroundColor:
                        table.id !== activeTableId
                          ? "var(--hover-bg)"
                          : undefined,
                    }}>
                    {table.keyCount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold mb-2">
              Khóa trong `{activeTable?.name}`
            </h3>
            <input
              type="search"
              placeholder="Tìm kiếm khóa..."
              className="w-full p-2 mb-2 rounded-md text-sm"
            />
            <nav className="flex-1 overflow-y-auto pr-1">
              <ul className="space-y-1">
                {activeTable?.keys.map((key) => (
                  <li
                    key={key.id}
                    onClick={() => setActiveKeyId(key.id)}
                    className="p-2 rounded-md cursor-pointer"
                    style={{
                      backgroundColor:
                        key.id === activeKeyId
                          ? "var(--active-bg)"
                          : "transparent",
                    }}>
                    <div className="flex items-center gap-2">
                      <StatusIndicator status={key.status} />
                      <div className="flex-1 overflow-hidden">
                        <p
                          className={`text-sm font-semibold truncate ${
                            key.id === activeKeyId ? "text-white" : ""
                          }`}>
                          {key.name}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            key.id === activeKeyId
                              ? "text-slate-200"
                              : "text-[var(--text-secondary)]"
                          }`}>
                          {key.type === "plural"
                            ? `{${Object.keys(key.cases).length}} cases`
                            : key.original}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* === Cột Giữa: Chi tiết bản dịch === */}
        <main
          className="flex-1 flex flex-col p-6 border-r"
          style={{ borderColor: "var(--border-color)" }}>
          {activeKey ? (
            <>
              <header className="mb-4">
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}>
                  Bảng: {activeTable.name}
                </p>
                <h1
                  className="text-2xl font-bold"
                  style={{ fontFamily: "monospace" }}>
                  {activeKey.name}
                </h1>
              </header>
              {activeKey.type === "plural" && (
                <div
                  className="p-3 rounded-lg mb-6 text-sm"
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderLeft: "4px solid var(--btn-bg)",
                  }}>
                  <p className="font-semibold">
                    Chuỗi này sử dụng quy tắc Số nhiều (Pluralization). Bạn cần
                    cung cấp bản dịch cho các trường hợp khác nhau.
                  </p>
                </div>
              )}
              {/* ... Nội dung dịch ... */}
              <footer
                className="mt-auto pt-4 border-t"
                style={{ borderColor: "var(--border-color)" }}>
                <div className="flex justify-end gap-3">
                  <button
                    className="p-3 px-6 rounded-lg font-semibold"
                    style={{ backgroundColor: "var(--btn-secondary-bg)" }}>
                    Lưu
                  </button>
                  <button
                    className="flex items-center gap-2 p-3 px-6 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: "var(--btn-bg)" }}>
                    Lưu & Khóa kế tiếp
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <p>Chọn một khóa để bắt đầu dịch.</p>
          )}
        </main>

        {/* === Cột Phải: Gợi ý === */}
        <aside
          className="w-96 flex flex-col"
          style={{ backgroundColor: "var(--bg-panel)" }}>
          {/* ... Nội dung cột phải ... */}
        </aside>
      </div>
    </div>
  );
}
