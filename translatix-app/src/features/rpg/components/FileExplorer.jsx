// src/features/rpg/components/FileExplorer.jsx

export function FileExplorer({ files, activeEventId, onEventSelect }) {
  // Hàm render icon tương ứng
  const getIcon = (type) => {
    if (type === "map") return "🗺️";
    if (type === "actors") return "👥";
    return "📄";
  };

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
        <input
          type="search"
          placeholder="Tìm kiếm file, sự kiện..."
          className="w-full p-2 rounded-md text-sm"
          style={{
            backgroundColor: "var(--bg-main)",
            border: "1px solid var(--border-color)",
          }}
        />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {files.map((file) => (
            <li key={file.name}>
              <div className="p-2 flex items-center justify-between rounded-md cursor-pointer">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-gray-400">
                    {file.events ? "▼" : "▶"}
                  </span>
                  <span className="text-xl">{getIcon(file.type)}</span>
                  <span className="font-semibold text-sm truncate">
                    {file.name}
                  </span>
                </div>
              </div>
              {file.events && (
                <ul
                  className="pl-4 mt-1 space-y-1 border-l ml-3"
                  style={{ borderColor: "var(--border-color)" }}>
                  {file.events.map((event) => (
                    <li
                      key={event.id}
                      className="event-node-item p-2 rounded-md cursor-pointer"
                      style={{
                        backgroundColor:
                          event.id === activeEventId
                            ? "var(--active-bg)"
                            : "transparent",
                      }}
                      onClick={() => onEventSelect(event, file)}>
                      <p
                        className="text-sm truncate pl-2"
                        style={{
                          color:
                            event.id === activeEventId
                              ? "white"
                              : "var(--text-secondary)",
                        }}>
                        {event.id}: {event.name}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
