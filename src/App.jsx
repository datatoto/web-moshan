import "./App.css";

import { Canvas } from "@react-three/fiber";
import Moshan from "./Moshan";

import { Environment, Stats } from "@react-three/drei";

function App() {
  return (
    <div className="App">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <Moshan />
        <Stats showPanel={0} className="stats" />
        <Environment files="background.hdr" background />
      </Canvas>
    </div>
  );
}

export default App;
