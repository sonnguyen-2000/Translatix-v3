// src/features/comic/mockData.js
export const fakeComicData = {
  name: "One Piece - Chap 1050",
  pages: [
    {
      id: "page-1",
      name: "page_01.png",
      thumbnailUrl: "https://placehold.co/200x280/1e293b/e2e8f0?text=Trang+01",
      imageUrl:
        "https://placehold.co/800x1120/e0e0e0/333333?text=Comic+Page+Raw",
      regions: [
        {
          id: "region-1-1",
          type: "bubble",
          icon: "💬",
          name: "Ô thoại 1",
          originalText: "お前にできんのか？",
          position: { top: "10%", left: "15%", width: "30%", height: "15%" },
          note: null,
        },
        {
          id: "region-1-2",
          type: "bubble",
          icon: "💬",
          name: "Ô thoại 2",
          originalText: "やめろ！",
          position: { top: "30%", left: "50%", width: "40%", height: "10%" },
          note: null,
        },
        {
          id: "region-1-3",
          type: "sfx",
          icon: "💥",
          name: "Hiệu ứng âm thanh 1",
          originalText: "ドン！(DON!)",
          position: { top: "60%", left: "10%", width: "25%", height: "20%" },
          note: "Đây là một câu nói mỉa mai, cần chú ý.",
        },
      ],
    },
    {
      id: "page-2",
      name: "page_02.png",
      thumbnailUrl: "https://placehold.co/200x280/1e293b/e2e8f0?text=Trang+02",
      imageUrl: "https://placehold.co/800x1120/e0e0e0/444444?text=Comic+Page+2",
      regions: [
        {
          id: "region-2-1",
          type: "bubble",
          icon: "💬",
          name: "Ô thoại 1",
          originalText: "こんにちは",
          position: { top: "15%", left: "20%", width: "50%", height: "12%" },
          note: null,
        },
      ],
    },
  ],
};
