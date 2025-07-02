// src/components/ui/Modal.jsx

import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { getRecentFiles, formatBytes } from "../../utils/fileUtils";

export function Modal({ isOpen, onClose, platform, onProjectOpen, onExited }) {
  const [recentFiles, setRecentFiles] = useState([]);
  const nodeRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cập nhật danh sách file gần đây khi modal mở hoặc platform thay đổi
  useEffect(() => {
    if (isOpen && platform) {
      setRecentFiles(getRecentFiles(platform.id));
    }
  }, [isOpen, platform]);

  // Xử lý đóng modal bằng phím Escape và khóa scroll body
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Hàm được gọi khi người dùng chọn file hoặc nhấn vào file gần đây
  // Nó sẽ báo cho App.jsx để mở project
  const handleFileSelect = () => {
    if (onProjectOpen) {
      onProjectOpen();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 transition-opacity duration-300"
      // Chỉ cho phép click khi modal đang mở
      style={{
        pointerEvents: isOpen ? "auto" : "none",
        opacity: isOpen ? 1 : 0,
      }}
      onClick={onClose}>
      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={300}
        classNames="modal"
        unmountOnExit
        onExited={onExited}>
        <div
          ref={nodeRef}
          className="modal-content w-full max-w-lg rounded-2xl shadow-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
          onClick={(e) => e.stopPropagation()}>
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: "var(--card-border)" }}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{platform?.icon}</span>
              <h2 className="text-lg font-bold">{platform?.modalTitle}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl hover:text-white/70 transition">
              &times;
            </button>
          </div>

          <div className="p-6 text-center">
            <p
              className="mb-6 text-sm"
              style={{ color: "var(--text-secondary)" }}>
              {platform?.modalDescription}
            </p>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition"
              style={{
                borderColor: "var(--card-border)",
                backgroundColor: "var(--hover-bg)",
              }}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-4"
                  style={{ color: "var(--text-secondary)" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p
                  className="mb-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}>
                  <span className="font-semibold">Kéo và thả file vào đây</span>
                  , hoặc
                </p>
                {/* Vì chưa có logic backend, nút này sẽ trực tiếp mở project */}
                <button
                  type="button"
                  className="btn-primary text-sm py-2 px-5 mt-2"
                  onClick={handleFileSelect}>
                  Chọn File
                </button>
              </div>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                className="hidden"
              />
            </label>

            {recentFiles.length > 0 && (
              <div className="mt-6 text-left">
                <h4
                  className="text-sm font-bold mb-2"
                  style={{ color: "var(--text-secondary)" }}>
                  Tệp gần đây
                </h4>
                <ul className="space-y-2">
                  {recentFiles.map((file) => (
                    <li
                      key={file.name}
                      className="flex items-center justify-between p-2 rounded-lg cursor-pointer"
                      style={{ backgroundColor: "var(--hover-bg)" }}
                      title={`Mở dự án từ file ${file.name}`}
                      // Nhấn vào file gần đây cũng sẽ mở project
                      onClick={handleFileSelect}>
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-xl">📄</span>
                        <div className="flex flex-col text-left overflow-hidden">
                          <span className="text-sm font-medium truncate">
                            {file.name}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--text-secondary)" }}>
                            {formatBytes(file.size)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
