import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Environment, Loader, Stats } from "@react-three/drei";
import { useControls } from "leva";

import Moshan from "./Moshan";
import { Overlay } from "./Overlay";

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  return (
    <>
      {/* <GuiControl /> */}
      <Canvas shadows>
        <Moshan />
        <Stats showPanel={0} className="stats" />
        <Environment files="background.hdr" background />
      </Canvas>
      <Loader />
      <Overlay />
    </>
  );
}

export default App;
