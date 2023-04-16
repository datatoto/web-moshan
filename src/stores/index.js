import { create } from "zustand";

// const useStore = create((set) => ({
//   // currentCirlPos: -0.45,
//   // currentDeclRot: 8,
//   currentRot: 10,

//   currentMapRot: 5,
//   updateCurrentRot: (r) => set(() => ({ currentRot: r })),
//   updateCurrentMapRot: (m) => set(() => ({ currentMapRot: m })),
//   // updateCurrentCirlPos: () =>
//   //   set((state) => ({ currentCirlPos: state.currentCirlPos - 0.05 })),
//   // updateCurrentDeclRot: () =>
//   //   set((state) => ({ currentDeclRot: state.currentDeclRot + 0.5 })),
//   //   updateCameraPosition: (cameraPosition) =>
//   //     set(() => ({ cameraPosition: cameraPosition })),
//   //   updateCameraLookAt: (cameraLookAt) =>
//   //     set(() => ({ cameraLookAt: cameraLookAt })),
// }));

const useCurrent = create((set) => ({
  current: 0,
  nextCurrent: () => set((state) => ({ current: state.current + 1 })),
  preCurrent: () => set((state) => ({ current: state.current - 1 })),
  resetCurrent: () => set((state) => ({ current: 0 })),
}));

const useCurrentCh = create((set) => ({
  currentCh: 0,
  chapterInfo: [
    {
      title: "判别方位",
      steps: [
        {
          title: "磁偏角校正",
        },
        {
          title: "平持罗盘",
        },
        {
          title: "对准测物",
        },
        {
          title: "进行读数",
        },
      ],
    },
    {
      title: "标定地图",
      steps: [
        {
          title: "旋转地图",
        },
        {
          title: "观察地物",
        },
        {
          title: "实验探索",
        },
      ],
    },
    {
      title: "确定站立点",
      steps: [
        {
          title: "实验理论",
        },
        {
          title: "实验探索",
        },
      ],
    },
    {
      title: "确定目标点",
      steps: [
        {
          title: "实验理论",
        },
        {
          title: "实验探索",
        },
      ],
    },
    {
      title: "综合测验",
      steps: [
        {
          title: "测验答题",
        },
        {
          title: "提交成绩",
        },
      ],
    },
  ],
  nextCurrentCh: () => set((state) => ({ currentCh: state.currentCh + 1 })),
  preCurrentCh: () => set((state) => ({ currentCh: state.currentCh - 1 })),
  setCurrentCh: (currentCh) => set((state) => ({ currentCh: currentCh })),
}));

const useIsPlayer = create((set) => ({
  isPlayer: false,
  togglePlayer: (isPlayer) => set(() => ({ isPlayer: isPlayer })),
}));

const useIsMap = create((set) => ({
  isMap: false,
  toggleMap: (isMap) => set(() => ({ isMap: isMap })),
}));

const useIsCompass = create((set) => ({
  isCompass: false,
  toggleCompass: (isCompass) => set(() => ({ isCompass: isCompass })),
}));

const useIsEagle = create((set) => ({
  isEagle: false,
  toggleEagle: (isEagle) => set(() => ({ isEagle: isEagle })),
}));

const useDome = create((set) => ({
  isDome: false,
  domeName: "",
  toggleDome: (isDome) => set(() => ({ isDome: isDome })),
  setDomeName: (domeName) => set(() => ({ domeName: domeName })),
}));

const useScore = create((set) => ({
  score: 0,
  setScore: (score) => set(() => ({ score: score })),
}));

// export const useExploreStore = create((set) => ({
//   isExplore: false,
//   toggleExplore: () => set((state) => ({ isExplore: !state.isExplore })),
// }));

// export const usePlayerPosStore = create((set) => ({
//   playerPos: [0, 0, 0],
//   updatePlayerPos: (p) => set(() => ({ playerPos: p })),
// }));

export {
  useCurrent,
  useCurrentCh,
  useIsPlayer,
  useIsMap,
  useIsCompass,
  useIsEagle,
  useDome,
  useScore
};
