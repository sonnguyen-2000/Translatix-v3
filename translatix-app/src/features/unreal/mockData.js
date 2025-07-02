// src/features/unreal/mockData.js

const findKeyById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findKeyById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

const data = {
  name: "Project_Titan.uproject",
  tree: [
    {
      id: "ns-ui",
      type: "namespace",
      name: "UI",
      children: [
        {
          id: "ns-ui-mainmenu",
          type: "namespace",
          name: "MainMenu",
          children: [
            {
              id: "key-ui-mainmenu-play",
              type: "key",
              name: "PlayButton_Text",
              status: "review",
              msgid: "Play",
              sourceLocation:
                "/Game/Blueprints/Widgets/WBP_MainMenu.WBP_MainMenu_C",
              devNote: "Text for the main play button in the main menu.",
              tm: [
                {
                  match: 80,
                  source: "Ready to Play",
                  translation: "Sẵn sàng chơi",
                },
              ],
            },
            {
              id: "key-ui-mainmenu-options",
              type: "key",
              name: "OptionsButton_Text",
              status: "done",
              msgid: "Options",
              sourceLocation:
                "/Game/Blueprints/Widgets/WBP_MainMenu.WBP_MainMenu_C",
              devNote: null,
              tm: [],
            },
          ],
        },
      ],
    },
    {
      id: "ns-dialogue",
      type: "namespace",
      name: "Dialogue",
      children: [],
    },
  ],
};

export const fakeUnrealData = {
  ...data,
  findKey: (id) => findKeyById(data.tree, id),
};
