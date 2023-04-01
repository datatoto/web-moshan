import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import { useControls } from "leva";

import Moshan from "./Moshan";

function GuiControl() {
  const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
}

function App() {
  return (
    <>
      <GuiControl />
      <div className="App">
        <Canvas shadows>
          <Moshan />
          <Stats showPanel={0} className="stats" />
          <Environment files="background.hdr" background />
        </Canvas>
      </div>
    </>
  );
}

export default App;
