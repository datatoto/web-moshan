import { create } from "zustand";

const useStore = create((set) => ({
  currentStep: 0,
  //   cameraPosition: [0, 4, 0],
  //   cameraLookAt: [0, 0, 0],
  updateCurrentStep: (currentStep) => set(() => ({ currentStep: currentStep })),
  //   updateCameraPosition: (cameraPosition) =>
  //     set(() => ({ cameraPosition: cameraPosition })),
  //   updateCameraLookAt: (cameraLookAt) =>
  //     set(() => ({ cameraLookAt: cameraLookAt })),
}));

export default useStore;
