// src/features/unreal/UnrealEditor.jsx
import { useState } from "react";

// --- COMPONENT CON ĐỆ QUY ---
// Component này có thể tự gọi lại chính nó để render các cấp thư mục lồng nhau
const TreeNode = ({ node, activeKeyId, onKeySelect, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === "key") {
    return (
      <li
        onClick={() => onKeySelect(node.id)}
        className="p-2 rounded-md cursor-pointer"
        style={{
          backgroundColor:
            node.id === activeKeyId ? "var(--active-bg)" : "transparent",
        }}>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              node.status === "done" ? "bg-green-400" : "bg-yellow-400"
            }`}></span>
          <div className="flex-1 overflow-hidden">
            <p
              className={`text-sm font-semibold truncate ${
                node.id === activeKeyId ? "text-white" : ""
              }`}>
              {node.name}
            </p>
            <p
              className={`text-xs truncate ${
                node.id === activeKeyId
                  ? "text-slate-200"
                  : "text-[var(--text-secondary)]"
              }`}>
              {node.msgid}
            </p>
          </div>
        </div>
      </li>
    );
  }

  // Nếu là namespace (thư mục)
  return (
    <li>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 rounded-md cursor-pointer">
        <span className="text-gray-400 mr-2">{isOpen ? "▼" : "▶"}</span>
        <span className="text-yellow-400">📁</span>
        <span className="ml-2 font-semibold text-sm">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <ul
          className="pl-6 space-y-1 border-l ml-5"
          style={{ borderColor: "var(--border-color)" }}>
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              activeKeyId={activeKeyId}
              onKeySelect={onKeySelect}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// --- EDITOR CHÍNH ---
export function UnrealEditor({ project, onExit }) {
  const [activeKeyId, setActiveKeyId] = useState("key-ui-mainmenu-play");
  const activeKey = project.findKey(activeKeyId);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <header
        className="w-full flex items-center justify-between px-4 py-2 border-b shrink-0"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-color)",
        }}>
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">Translatix Unreal Editor</h1>
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
            Lưu & Xuất file PO
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* === Cột Trái: Cây Namespace === */}
        <aside
          className="w-96 flex flex-col border-r"
          style={{
            backgroundColor: "var(--bg-panel)",
            borderColor: "var(--border-color)",
          }}>
          <div
            className="p-4 border-b"
            style={{ borderColor: "var(--border-color)" }}>
            <input
              type="search"
              placeholder="Tìm kiếm Namespace hoặc Key..."
              className="w-full p-2 rounded-md text-sm"
            />
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {project.tree.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  activeKeyId={activeKeyId}
                  onKeySelect={setActiveKeyId}
                />
              ))}
            </ul>
          </nav>
        </aside>

        {/* === Cột Giữa: Chi tiết bản dịch === */}
        <main
          className="flex-1 flex flex-col p-6 border-r"
          style={{ borderColor: "var(--border-color)" }}>
          {activeKey ? (
            <>
              <header className="mb-4">
                <p
                  className="text-sm font-mono"
                  style={{ color: "var(--text-secondary)" }}>
                  Namespace: {activeKey.id.split("-").slice(1, -1).join(".")}
                </p>
                <h1 className="text-2xl font-bold font-mono">
                  {activeKey.name}
                </h1>
              </header>
              <div
                className="p-3 rounded-lg mb-6 text-sm"
                style={{ backgroundColor: "var(--hover-bg)" }}>
                <p className="font-semibold mb-1">
                  Vị trí nguồn (Source Location)
                </p>
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--text-secondary)" }}>
                  {activeKey.sourceLocation}
                </p>
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "var(--bg-panel)" }}>
                  <label
                    className="text-sm font-semibold block mb-2"
                    style={{ color: "var(--text-secondary)" }}>
                    Văn bản gốc (msgid)
                  </label>
                  <p className="text-2xl font-medium">{activeKey.msgid}</p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "var(--bg-panel)" }}>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-secondary)" }}>
                      Bản dịch (msgstr)
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
                    className="w-full mt-1 p-3 rounded text-2xl font-medium"
                    rows="1"
                    placeholder="Nhập bản dịch..."></textarea>
                </div>
              </div>
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
            <p>Chọn một khóa để bắt đầu.</p>
          )}
        </main>

        {/* === Cột Phải: Hỗ trợ === */}
        <aside
          className="w-96 flex flex-col"
          style={{ backgroundColor: "var(--bg-panel)" }}>
          {/* ...Nội dung cột phải... */}
        </aside>
      </div>
    </div>
  );
}
