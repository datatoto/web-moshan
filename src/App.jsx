import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Loader, Stats } from "@react-three/drei";
// import { useControls } from "leva";

import Scene from "./Scene";
import { Page } from "./components/Page";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ConfigProvider, theme } from "antd";
// DONE: stepper
import { Stepper } from "./components/Stepper";

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* TODO: sider */}
        <Sider width={"23vw"} style={{ padding: 10 }}>
          <Stepper />
        </Sider>
        <Layout>
          <Content>
            {/* <GuiControl /> */}
            <Canvas shadows>
              <Scene />
              {/* <Stats showPanel={0} className="stats" /> */}
            </Canvas>
            <Loader />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
