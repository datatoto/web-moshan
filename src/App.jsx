import "./App.css";

import { Bvh, Loader, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Aside from "./components/Aside";
import { Perf } from "r3f-perf";
import { Scene } from "./components/Scene";
import { Ground } from "./models/Ground";

function App() {
  const mainView = useRef();
  // const compassView = useRef();
  // const mapView = useRef();
  const ground = useRef(null);

  return (
    <>
      <div className="container">
        <Canvas
          gl={{ antialias: false }}
          className="canvas"
          eventSource={document.getElementById("root")}
        >
          <Suspense fallback={null}>
            <View index={1} track={mainView}>
              <Bvh firstHitOnly>
                <Ground ref={ground} />
              </Bvh>
              <Scene ground={ground} />
            </View>

          </Suspense>
          <Preload all />
          {/* <Perf position="top-right" /> */}
        </Canvas>

        <Loader />

        {/* Tracking div's, regular HTML and made responsive with CSS media-queries ... */}
        <div
          ref={mainView}
          className="panel main"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        ></div>

        {/* <div
          ref={compassView}
          className="panel compass"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "300px",
            height: "300px",
          }}
        ></div>

        <div
          ref={mapView}
          className="panel map"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "300px",
            height: "300px",
          }}
        ></div> */}
      </div>

      <Aside />
    </>
  );
}

export default App;
