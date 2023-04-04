import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Loader, Stats } from "@react-three/drei";
// import { useControls } from "leva";

import Scene from "./Scene";
import { Page } from "./components/Page";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ConfigProvider, theme } from "antd";
// TODO: steper
import { Steper } from "./components/Steper";

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* TODO: sider */}
        <Sider width={"23vw"}>
          <div
            style={{
              height: "100%",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Page />
            <Page />
          </div>
          {/* <Stepper /> */}
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
