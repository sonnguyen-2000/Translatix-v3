// src/features/rpg/components/Storyboard.jsx

// Component con cho từng loại lệnh
const ShowFaceCommand = ({ command }) => (
  <div
    className="flex items-center gap-4 p-3 rounded-lg"
    style={{ backgroundColor: "var(--bg-panel)" }}>
    <img
      src={command.face.img}
      alt="Face"
      className="w-12 h-12 rounded-md shrink-0"
    />
    <div>
      <p className="font-semibold">Hiển thị khuôn mặt</p>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Faceset: {command.face.name}, Index: {command.face.index}
      </p>
    </div>
  </div>
);

const ShowTextCommand = ({ command }) => (
  <div
    className="p-4 rounded-lg"
    style={{ backgroundColor: "var(--bg-panel)" }}>
    <div className="mb-3">
      <p
        className="text-sm font-semibold mb-1"
        style={{ color: "var(--text-secondary)" }}>
        Văn bản gốc
      </p>
      <p className="p-2 rounded" style={{ backgroundColor: "var(--bg-main)" }}>
        {command.text}
      </p>
    </div>
    <div>
      <div className="flex justify-between items-center mb-1">
        <label
          className="text-sm font-semibold"
          style={{ color: "var(--text-secondary)" }}>
          Bản dịch
        </label>
        <button
          title="Dịch tự động bằng AI (Ctrl+Space)"
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md font-semibold transition-colors"
          style={{
            color: "var(--btn-bg)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
          }}>
          ✨ Dịch tự động
        </button>
      </div>
      <textarea
        className="w-full p-2 rounded text-base"
        style={{ backgroundColor: "var(--bg-main)" }}
        rows="2"
        placeholder="Nhập bản dịch..."></textarea>
    </div>
  </div>
);

const OtherCommand = ({ command }) => (
  <p
    className="text-sm p-3 rounded-lg"
    style={{
      color: "var(--text-secondary)",
      backgroundColor: "var(--bg-panel)",
    }}>
    ◆ Lệnh: {command.comment || `Code ${command.code}`}
  </p>
);

// Component Storyboard chính
export function Storyboard({ activeEvent }) {
  if (!activeEvent) {
    return (
      <main
        className="flex-1 flex items-center justify-center p-6 border-r"
        style={{ borderColor: "var(--border-color)" }}>
        <p style={{ color: "var(--text-secondary)" }}>
          Chọn một sự kiện từ danh sách bên trái để bắt đầu.
        </p>
      </main>
    );
  }

  const getIconForCode = (code) => {
    if (code === 101) return "👤";
    if (code === 401) return "✏️";
    return "⚙️";
  };

  return (
    <main
      className="flex-1 flex flex-col p-6 border-r"
      style={{ borderColor: "var(--border-color)" }}>
      <header className="mb-6">
        <div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            File: {activeEvent.parentFile.name}
          </p>
          <h1 className="text-2xl font-bold">
            {activeEvent.id}: {activeEvent.name}
          </h1>
        </div>
      </header>
      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {activeEvent.script.map((command, index) => (
          <div key={index} className="relative pl-8 py-2 event-command">
            <div
              className="absolute left-0 top-3 w-6 h-6 rounded-full flex items-center justify-center ring-2"
              style={{
                backgroundColor:
                  command.code === 401 ? "var(--active-bg)" : "var(--hover-bg)",
                borderColor: "var(--border-color)",
              }}>
              <span className="text-sm text-white box-sizing: border-box;">
                {getIconForCode(command.code)}
              </span>
            </div>
            {command.code === 101 && <ShowFaceCommand command={command} />}
            {command.code === 401 && <ShowTextCommand command={command} />}
            {command.code !== 101 && command.code !== 401 && (
              <OtherCommand command={command} />
            )}
          </div>
        ))}
      </div>
      <footer
        className="mt-auto pt-4 border-t"
        style={{ borderColor: "var(--border-color)" }}>
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 p-3 px-6 rounded-lg font-semibold text-white text-base"
            style={{ backgroundColor: "var(--btn-bg)" }}>
            Lưu & Sự kiện kế tiếp
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </footer>
    </main>
  );
}
