// src/features/rpg/RPGEditor.jsx

import { useState, useEffect } from "react";
import { FileExplorer } from "./components/FileExplorer";
import { Storyboard } from "./components/Storyboard";
import { ContextPanel } from "./components/ContextPanel";

export function RPGEditor({ project, onExit }) {
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    if (project && project.files?.[0]?.events?.[0]) {
      const firstEvent = project.files[0].events[0];
      const firstFile = project.files[0];
      setActiveEvent({ ...firstEvent, parentFile: firstFile });
    }
  }, [project]);

  const handleEventSelect = (event, file) => {
    setActiveEvent({ ...event, parentFile: file });
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <header
        className="w-full flex items-center justify-between px-4 py-2 border-b shrink-0"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-color)",
        }}>
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm p-2 rounded-md"
            style={{ backgroundColor: "var(--hover-bg)" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại
          </button>
          <div
            className="w-px h-6"
            style={{ backgroundColor: "var(--border-color)" }}></div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Dự án:</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {project.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-sm px-3 py-1 rounded-md"
            style={{ backgroundColor: "var(--btn-secondary-bg)" }}>
            Cài đặt dự án
          </button>
          <button
            className="text-sm px-3 py-1 rounded-md text-white"
            style={{ backgroundColor: "var(--btn-bg)" }}>
            Đồng bộ & Xuất file
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <FileExplorer
          files={project.files}
          activeEventId={activeEvent?.id}
          onEventSelect={handleEventSelect}
        />
        <Storyboard activeEvent={activeEvent} />
        <ContextPanel activeEvent={activeEvent} />
      </div>
    </div>
  );
}
