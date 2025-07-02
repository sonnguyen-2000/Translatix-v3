// src/hooks/useStarfield.js

import { useEffect, useRef } from "react";

export function useStarfield(canvasRef) {
  // Dùng useRef để lưu trữ ID của animation frame, giúp chúng ta có thể hủy nó khi cần
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // --- Cấu hình cho các ngôi sao ---
    const numStars = 300; // Số lượng ngôi sao
    const stars = [];

    // Hàm để thiết lập kích thước canvas và tạo lại các ngôi sao
    const setup = () => {
      // Set kích thước canvas bằng kích thước cửa sổ
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Tạo ra các ngôi sao với vị trí, kích thước và tốc độ ngẫu nhiên
      stars.length = 0; // Xóa các ngôi sao cũ
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1, // Kích thước từ 1 đến 3
          speed: Math.random() * 0.5 + 0.2, // Tốc độ di chuyển
        });
      }
    };

    // --- Vòng lặp Animation ---
    const animate = () => {
      // Xóa toàn bộ canvas để vẽ lại frame mới
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lặp qua từng ngôi sao để cập nhật vị trí và vẽ lại
      stars.forEach((star) => {
        // Cập nhật vị trí y (di chuyển từ trên xuống dưới)
        star.y += star.speed;

        // Nếu ngôi sao đi ra khỏi màn hình, tái tạo nó ở trên cùng với vị trí x ngẫu nhiên
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Vẽ ngôi sao
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Màu trắng với độ trong suốt
        ctx.fill();
      });

      // Yêu cầu trình duyệt vẽ frame tiếp theo
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // --- Xử lý sự kiện và dọn dẹp ---

    // Thiết lập lại canvas khi kích thước cửa sổ thay đổi
    const handleResize = () => {
      setup();
    };

    window.addEventListener("resize", handleResize);

    // Bắt đầu chạy
    setup();
    animate();

    // Hàm dọn dẹp: sẽ được gọi khi component bị unmount
    return () => {
      // Hủy vòng lặp animation để tránh rò rỉ bộ nhớ
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // Gỡ bỏ trình theo dõi sự kiện resize
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]); // Effect này chỉ chạy một lần khi canvasRef được gắn
}
