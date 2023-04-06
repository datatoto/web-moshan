import { create } from "zustand";

const useStore = create((set) => ({
  currentStep: 0,
  currentCirlPos: -0.45,
  currentDeclRot: 8,
  //   cameraPosition: [0, 4, 0],
  //   cameraLookAt: [0, 0, 0],
  updateCurrentStep: (s) => set(() => ({ currentStep: s })),
  updateCurrentCirlPos: () =>
    set((state) => ({ currentCirlPos: state.currentCirlPos - 0.05 })),
  updateCurrentDeclRot: () =>
    set((state) => ({ currentDeclRot: state.currentDeclRot + 0.5 })),
  //   updateCameraPosition: (cameraPosition) =>
  //     set(() => ({ cameraPosition: cameraPosition })),
  //   updateCameraLookAt: (cameraLookAt) =>
  //     set(() => ({ cameraLookAt: cameraLookAt })),
}));

export default useStore;
