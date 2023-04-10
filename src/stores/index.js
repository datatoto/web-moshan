import { create } from "zustand";

const useStore = create((set) => ({
  currentCh: 0,
  currentStep: 0,

  currentCirlPos: -0.45,
  currentDeclRot: 8,
  currentRot: 1,

  currentMapRot: 5,
  updateCurrentCh: (c) => set(() => ({ currentCh: c })),
  updateCurrentStep: (s) => set(() => ({ currentStep: s })),
  updateCurrentRot: (r) => set(() => ({ currentRot: r })),
  updateCurrentMapRot: (m) => set(() => ({ currentMapRot: m })),
  updateCurrentCirlPos: () =>
    set((state) => ({ currentCirlPos: state.currentCirlPos - 0.05 })),
  updateCurrentDeclRot: () =>
    set((state) => ({ currentDeclRot: state.currentDeclRot + 0.5 })),
  //   updateCameraPosition: (cameraPosition) =>
  //     set(() => ({ cameraPosition: cameraPosition })),
  //   updateCameraLookAt: (cameraLookAt) =>
  //     set(() => ({ cameraLookAt: cameraLookAt })),
}));

export const useExploreStore = create((set) => ({
  isExplore: true,
  toggleExplore: () => set((state) => ({ isExplore: !state.isExplore })),
}));

export const usePlayerPosStore = create((set) => ({
  playerPos: [0, 0, 0],
  updatePlayerPos: (p) => set(() => ({ playerPos: p })),
}));

export default useStore;
