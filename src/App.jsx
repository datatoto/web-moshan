import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Loader, Stats } from "@react-three/drei";
// import { useControls } from "leva";

import Scene from "./Scene";
import { Page } from "./components/Page";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ConfigProvider, Divider, theme } from "antd";
// DONE: stepper
import { Stepper } from "./components/Stepper";
import Typography from "antd/es/typography/Typography";

const { Title } = Typography;

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* TODO: sider */}
        <Sider width={"23vw"} style={{ padding: "5px 10px", overflow: "auto" }}>
          <Title
            level={3}
            style={{
              textAlign: "center",
            }}
          >
            判别方位
          </Title>
          <Divider />
          <Stepper />
        </Sider>
        <Layout>
          <Content>
            {/* <GuiControl /> */}
            <Canvas shadows>
              <Scene />
              <Stats showPanel={0} className="stats" />
            </Canvas>
            <Loader />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
