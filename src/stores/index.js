import { create } from "zustand";

const useStore = create((set) => ({
  // currentCirlPos: -0.45,
  // currentDeclRot: 8,
  currentRot: 10,

  currentMapRot: 5,
  updateCurrentRot: (r) => set(() => ({ currentRot: r })),
  updateCurrentMapRot: (m) => set(() => ({ currentMapRot: m })),
  // updateCurrentCirlPos: () =>
  //   set((state) => ({ currentCirlPos: state.currentCirlPos - 0.05 })),
  // updateCurrentDeclRot: () =>
  //   set((state) => ({ currentDeclRot: state.currentDeclRot + 0.5 })),
  //   updateCameraPosition: (cameraPosition) =>
  //     set(() => ({ cameraPosition: cameraPosition })),
  //   updateCameraLookAt: (cameraLookAt) =>
  //     set(() => ({ cameraLookAt: cameraLookAt })),
}));

const useCurrentCh = create((set) => ({
  currentCh: 0,
  nextCurrentCh: () => set((state) => ({ currentCh: state.currentCh + 1 })),
  preCurrentCh: () => set((state) => ({ currentCh: state.currentCh - 1 })),
}));

// export const useExploreStore = create((set) => ({
//   isExplore: false,
//   toggleExplore: () => set((state) => ({ isExplore: !state.isExplore })),
// }));

// export const usePlayerPosStore = create((set) => ({
//   playerPos: [0, 0, 0],
//   updatePlayerPos: (p) => set(() => ({ playerPos: p })),
// }));

export { useStore, useCurrentCh };
