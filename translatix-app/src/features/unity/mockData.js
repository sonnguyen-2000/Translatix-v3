// src/features/unity/mockData.js

export const fakeUnityData = {
  name: "The Last Stand.uproject",
  tables: [
    {
      id: "table-1",
      name: "UI_MainMenu",
      keyCount: 15,
      keys: [
        {
          id: "key-1-1",
          name: "main_menu_title",
          status: "done",
          type: "simple",
          original: "The Last Stand",
        },
        {
          id: "key-1-2",
          name: "main_menu_play",
          status: "done",
          type: "simple",
          original: "Play Game",
        },
      ],
    },
    {
      id: "table-2",
      name: "Items_Inventory",
      keyCount: 48,
      keys: [
        {
          id: "key-2-1",
          name: "item_potion_name",
          status: "done",
          type: "simple",
          original: "Potion",
        },
        {
          id: "key-2-2",
          name: "inventory_apple_count",
          status: "review",
          type: "plural",
          cases: {
            one: "1 apple",
            many: "You have {0} apples.",
          },
          tm: [
            {
              match: 100,
              source: "You have {0} arrows.",
              translation: "Bạn có {0} mũi tên.",
            },
            {
              match: 85,
              source: "You have {0} items.",
              translation: "Bạn có {0} vật phẩm.",
            },
          ],
          glossary: {
            apple: "quả táo",
            you: "bạn",
          },
        },
        {
          id: "key-2-3",
          name: "quest_reward_toast",
          status: "todo",
          type: "simple",
          original: "You received {0} Gold!",
        },
        {
          id: "key-2-4",
          name: "img_title_logo",
          status: "todo",
          type: "asset",
          original: "[Asset: Image]",
        },
      ],
    },
  ],
};
