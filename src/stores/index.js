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
}));

const useCurrentCh = create((set) => ({
  currentCh: 0,
  nextCurrentCh: () => set((state) => ({ currentCh: state.currentCh + 1 })),
  preCurrentCh: () => set((state) => ({ currentCh: state.currentCh - 1 })),
}));

const useIsMap = create((set) => ({
  isMap: false,
  toggleMap: () => set((state) => ({ isMap: !state.isMap })),
}));

const useIsCompass = create((set) => ({
  isCompass: false,
  toggleCompass: () => set((state) => ({ isCompass: !state.isCompass })),
}));

// export const useExploreStore = create((set) => ({
//   isExplore: false,
//   toggleExplore: () => set((state) => ({ isExplore: !state.isExplore })),
// }));

// export const usePlayerPosStore = create((set) => ({
//   playerPos: [0, 0, 0],
//   updatePlayerPos: (p) => set(() => ({ playerPos: p })),
// }));

export { useCurrent, useCurrentCh, useIsMap, useIsCompass };
