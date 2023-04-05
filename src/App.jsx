import "./App.css";

import {
  Environment,
  Loader,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Stats,
  View,
} from "@react-three/drei";
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
      <Layout>
        {/* TODO: sider */}
        <Sider
          width={"25vw"}
          style={{ height: "100vh", padding: "5px 10px", overflowY: "scroll" }}
        >
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
            <Scene />
            {/* <div className="view1" ref={view1} /> */}
            {/* <div className="view2" ref={view2} /> */}
            {/* <GuiControl /> */}
            <Loader />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
