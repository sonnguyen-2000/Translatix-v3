// src/features/rpg/components/ContextPanel.jsx

export function ContextPanel({ activeEvent }) {
  // Tìm command hiển thị khuôn mặt cuối cùng trong script
  const lastFaceCommand = activeEvent
    ? [...activeEvent.script].reverse().find((cmd) => cmd.code === 101)
    : null;

  return (
    <aside
      className="w-96 flex flex-col shrink-0"
      style={{ backgroundColor: "var(--bg-panel)" }}>
      <div className="border-b" style={{ borderColor: "var(--border-color)" }}>
        <nav className="flex -mb-px px-2">
          <button
            className="p-4 text-sm font-medium border-b-2"
            style={{
              borderColor: "var(--btn-bg)",
              color: "var(--text-primary)",
            }}>
            Ngữ cảnh
          </button>
          <button
            className="p-4 text-sm font-medium border-b-2 border-transparent"
            style={{ color: "var(--text-secondary)" }}>
            Công cụ
          </button>
        </nav>
      </div>
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {activeEvent ? (
          <div>
            <h3 className="font-bold mb-2">Xem trước trực quan</h3>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: "var(--bg-main)" }}>
              <div className="flex items-end gap-3">
                <img
                  src={
                    lastFaceCommand
                      ? lastFaceCommand.face.img
                      : "https://via.placeholder.com/64x64/1e293b/334155.png?text=?"
                  }
                  alt="Character Portrait"
                  className="w-16 h-16 rounded-md shrink-0 border-2"
                  style={{ borderColor: "#60a5fa" }}
                />
                <div
                  className="flex-1 p-3 rounded-lg"
                  style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                  <p className="text-sm font-bold text-yellow-300 mb-1">
                    {activeEvent.name}
                  </p>
                  <p className="text-base text-white">...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Không có ngữ cảnh để hiển thị.
          </p>
        )}
      </div>
    </aside>
  );
}
