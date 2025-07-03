// src/App.jsx

import { useState, useRef, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { RPGEditor } from "./features/rpg/RPGEditor";
import { ComicEditor } from "./features/comic/ComicEditor";
import { Modal } from "./components/ui/Modal";
import { platformData } from "./pages/platformData";
import { UnityEditor } from "./features/unity/UnityEditor";
import { UnrealEditor } from "./features/unreal/UnrealEditor";

import { ThemeToggleButton } from "./components/ui/ThemeToggleButton";
import { useStarfield } from "./hooks/useStarfield";
import { setupInitialRecentFiles } from "./utils/fileUtils";

function StarfieldBackground() {
  const canvasRef = useRef(null);
  useStarfield(canvasRef);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

function App() {
  const [activeView, setActiveView] = useState("home");
  const [loadedProject, setLoadedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  useEffect(() => {
    setupInitialRecentFiles();
  }, []);

  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformData[platformId]);
    setIsModalOpen(true);
  };

  const handleProjectOpen = async () => {
    try {
      // Mở hộp thoại chọn folder thông qua Electron preload API
      const folderPath = await window.electronAPI.selectFolder();
      if (!folderPath) return;

      // Gọi API BE để khởi tạo project
      const response = await fetch("http://localhost:8000/api/comic/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_path: folderPath }),
      });

      const data = await response.json();

      if (data.error) {
        alert("Lỗi khi khởi tạo project: " + data.error);
        return;
      }

      if (selectedPlatform?.id === "comic") {
        setLoadedProject({
          type: "comic",
          data: convertApiToComicProject(data),
        });
        setActiveView("editor-comic");
      }
    } catch (err) {
      console.error("Lỗi khi mở project:", err);
    }

    setIsModalOpen(false);
  };

  const convertApiToComicProject = (apiData) => {
    const folder = apiData.folder_path;

    const pages = apiData.pages_overview.map((page) => {
      const regionsRaw =
        page.id === apiData.initial_page_data?.id
          ? apiData.initial_page_data?.regions || []
          : [];

      return {
        id: page.id,
        name: page.name,
        thumbnailUrl: `file://${folder}/${page.name}`,
        imageUrl: `file://${folder}/${page.name}`,
        regions: regionsRaw.map((r) => ({
          id: r.id,
          name: r.source_text,
          originalText: r.source_text,
          confidence: r.confidence,
          position: {
            position: "absolute",
            left: r.position.x,
            top: r.position.y,
            width: r.position.width,
            height: r.position.height,
          },
          icon: "🔲",
        })),
      };
    });

    return {
      id: apiData.id,
      name: apiData.name,
      pages,
    };
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditorExit = () => {
    setLoadedProject(null);
    setActiveView("home");
  };

  return (
    <div className="font-sans bg-bg-main text-text-primary">
      <StarfieldBackground />
      <ThemeToggleButton />
      {activeView === "home" && (
        <HomePage onPlatformSelect={handlePlatformSelect} />
      )}
      {activeView === "editor-rpg" && loadedProject?.type === "rpg" && (
        <RPGEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      {activeView === "editor-comic" && loadedProject?.type === "comic" && (
        <ComicEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      {activeView === "editor-unity" && loadedProject?.type === "unity" && (
        <UnityEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      {activeView === "editor-unreal" && loadedProject?.type === "unreal" && (
        <UnrealEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        platform={selectedPlatform}
        onProjectOpen={handleProjectOpen}
        onExited={() => setSelectedPlatform(null)}
      />
    </div>
  );
}

export default App;
