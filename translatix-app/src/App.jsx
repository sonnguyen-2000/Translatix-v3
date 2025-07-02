// src/App.jsx

import { useState, useRef, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { RPGEditor } from "./features/rpg/RPGEditor";
import { fakeProjectData as fakeRpgData } from "./features/rpg/mockData";
import { ComicEditor } from "./features/comic/ComicEditor";
import { fakeComicData } from "./features/comic/mockData";
import { Modal } from "./components/ui/Modal";
import { platformData } from "./pages/platformData";
import { UnityEditor } from "./features/unity/UnityEditor";
import { fakeUnityData } from "./features/unity/mockData";
import { UnrealEditor } from "./features/unreal/UnrealEditor";
import { fakeUnrealData } from "./features/unreal/mockData";

// Giữ nguyên các component toàn cục
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
    // ĐÃ SỬA: Kiểm tra nếu platform là 'rpg' hoặc 'comic'
    setSelectedPlatform(platformData[platformId]);
    setIsModalOpen(true);
  };

  const handleProjectOpen = () => {
    if (selectedPlatform?.id === "rpg") {
      setLoadedProject({ type: "rpg", data: fakeRpgData });
      setActiveView("editor-rpg");
    } else if (selectedPlatform?.id === "comic") {
      setLoadedProject({ type: "comic", data: fakeComicData });
      setActiveView("editor-comic");
    } else if (selectedPlatform?.id === "unity") {
      setLoadedProject({ type: "unity", data: fakeUnityData });
      setActiveView("editor-unity");
    } else if (selectedPlatform?.id === "unreal") {
      setLoadedProject({ type: "unreal", data: fakeUnrealData });
      setActiveView("editor-unreal");
    }

    setIsModalOpen(false);
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
      {activeView === "editor-rpg" && loadedProject && (
        <RPGEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      {activeView === "editor-comic" && loadedProject && (
        <ComicEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      {activeView === "editor-unity" && loadedProject && (
        <UnityEditor project={loadedProject.data} onExit={handleEditorExit} />
      )}
      {activeView === "editor-unreal" && loadedProject && (
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
