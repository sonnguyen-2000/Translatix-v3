// src/features/rpg/mockData.js
export const fakeProjectData = {
  name: "Hành Trình Thức Tỉnh.exe",
  files: [
    {
      type: "map",
      name: "Map001_Thị Trấn Khởi Đầu.json",
      events: [
        {
          id: "EV001",
          name: "Trưởng làng Elara",
          script: [
            {
              code: 101,
              face: {
                name: "Elder",
                index: 0,
                img: "https://via.placeholder.com/48x48/475569/e2e8f0.png?text=Elara",
              },
            },
            {
              code: 401,
              text: "Chào mừng, người lữ hành. Cậu đã đến đúng lúc.",
            },
            {
              code: 401,
              text: "Bóng tối đang bao trùm vương quốc của chúng ta. Một cổ vật bị đánh cắp... Cậu có sẵn lòng giúp đỡ không?",
            },
            { code: 108, comment: "Hiển thị lựa chọn cho người chơi" },
          ],
        },
        {
          id: "EV002",
          name: "Lính gác cổng",
          script: [
            {
              code: 101,
              face: {
                name: "Guard",
                index: 1,
                img: "https://via.placeholder.com/48x48/7f1d1d/e2e8f0.png?text=Guard",
              },
            },
            {
              code: 401,
              text: "Dừng lại! Không ai được phép vào thành lúc này theo lệnh của Đại tướng.",
            },
            {
              code: 101,
              face: {
                name: "Player",
                index: 0,
                img: "https://via.placeholder.com/48x48/3b82f6/e2e8f0.png?text=Hero",
              },
            },
            {
              code: 401,
              text: "Nhưng tôi có việc khẩn cấp. Trưởng làng Elara đã cử tôi đi.",
            },
            {
              code: 101,
              face: {
                name: "Guard",
                index: 2,
                img: "https://via.placeholder.com/48x48/7f1d1d/e2e8f0.png?text=Guard",
              },
            },
            {
              code: 401,
              text: "Trưởng làng Elara? ... Được rồi, cậu có thể qua. Nhưng hãy cẩn thận.",
            },
          ],
        },
      ],
    },
    {
      type: "actors",
      name: "Actors.json",
      events: [
        {
          id: "ACT001",
          name: "Nhân vật",
          script: [{ code: "actor_data", text: "Dữ liệu các nhân vật..." }],
        },
      ],
    },
  ],
};
