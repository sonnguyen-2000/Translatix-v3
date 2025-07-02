// src/components/ui/ThemeToggleButton.jsx

import { useTheme } from "../../contexts/ThemeContext";

export function ThemeToggleButton() {
  // Lấy cả `theme` và `toggleTheme` từ context
  const { theme, toggleTheme } = useTheme();

  return (
    // Thay đổi vị trí từ top-5 thành bottom-5
    <div className="fixed bottom-5 left-5 z-50">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="p-2 h-10 w-10 flex items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/50 dark:bg-white/10 backdrop-blur text-xl transition-transform duration-300 hover:scale-110">
        {/*
          Hiển thị icon mặt trời nếu đang ở theme tối (dark),
          và icon mặt trăng nếu đang ở theme sáng (light).
        */}
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
