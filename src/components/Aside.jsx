import { Affix, Button, Divider, FloatButton, Result, Space, Steps } from "antd";
import { DesOne } from "./DesOne";
import {
  useCurrent,
  useCurrentCh,
  useDome,
  useIsCompass,
  // useIsDome,
  useIsEagle,
  useIsMap,
  useIsPlayer,
} from "../stores";
import { useEffect, useState } from "react";
import { DesTwo } from "./DesTwo";
import { DesThree } from "./DesThree";
import { DesFour } from "./DesFour";
import Test from "./Test";
import ProgressSteps from "./ProgressSteps";

export default function Aside(props) {
  const [current, nextCurrent, preCurrent, resetCurrent] = useCurrent(
    (state) => [
      state.current,
      state.nextCurrent,
      state.preCurrent,
      state.resetCurrent,
    ]
  );

  const [currentCh, chapterInfo, nextCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.chapterInfo,
    state.nextCurrentCh,
  ]);

  const title = chapterInfo[currentCh].title;
  const items = chapterInfo[currentCh].steps.map((i) => ({
    key: i.title,
    title: i.title,
  }));

  const [isPlayer, togglePlayer] = useIsPlayer((state) => [
    state.isPlayer,
    state.togglePlayer,
  ]);
  const [isMap, toggleMap] = useIsMap((state) => [
    state.isMap,
    state.toggleMap,
  ]);
  const [isCompass, toggleCompass] = useIsCompass((state) => [
    state.isCompass,
    state.toggleCompass,
  ]);
  const [isEagle, toggleEagle] = useIsEagle((state) => [
    state.isEagle,
    state.toggleEagle,
  ]);
  const [isDome, toggleDome] = useDome((state) => [
    state.isDome,
    state.toggleDome,
  ]);

  const [asideVis, setAsideVis] = useState(true);

  function handleNextCh() {
    resetCurrent();
    nextCurrentCh();
    // if (currentCh === 3) {
    //   setTest(true);
    // }
  }

  function handleEagle() {
    togglePlayer(!isPlayer);
    toggleCompass(false);
    toggleMap(false);
    toggleDome(false);
    toggleEagle(!isEagle);
    setAsideVis(!asideVis)
  }

  function handleMap() {
    // togglePlayer(false);
    // toggleCompass(false);
    toggleDome(false);
    toggleEagle(false);
    toggleMap(!isMap);
  }

  function handleCompass() {
    // togglePlayer(false);
    // toggleMap(false);
    toggleDome(false);
    toggleEagle(false);
    toggleCompass(!isCompass);
  }

  return (
    <>
      <aside
        className="glass aside"
        style={{
          position: "absolute",
          top: "0px",
          width: "20vw",
          height: "98vh",
          padding: "5px 10px",
          overflowY: "scroll",
          margin: "10px",
          zIndex: "5",
          visibility: asideVis ? "visible" : "hidden",
        }}
      >
        <h3
          style={{
            textAlign: "center",
          }}
        >
          {chapterInfo[currentCh].title}
        </h3>
        <Steps direction="vertical" current={current} items={items} />
        <Divider />
        {currentCh === 0 && <DesOne current={current} />}
        {currentCh === 1 && <DesTwo current={current} />}
        {currentCh === 2 && <DesThree current={current} />}
        {currentCh === 3 && <DesFour current={current} />}
        {currentCh === 4 && current === 0 && <Test />}
        {currentCh === 4 && current === 1 && (
          <Result
            status="success"
            title="成绩成功提交"
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => setAsideVis(!asideVis)}
              >
                探索磨山
              </Button>,
            ]}
          />
        )}
        <Divider />
        <Space>
          {current < items.length - 1 && (
            <Button type="primary" onClick={() => nextCurrent()}>
              {currentCh === 4 ? "提交成绩" : "下一步"}
            </Button>
          )}
          {currentCh < 4 && current > 0 && (
            <Button onClick={() => preCurrent()}>上一步</Button>
          )}
          {currentCh < 4 && current === items.length - 1 && (
            <Button type="primary" onClick={() => handleNextCh()}>
              {currentCh === 3 ? "进行测验" : "下一章"}
            </Button>
          )}
          {/* {currentCh === 4 && current === items.length - 1 && (
            <Button type="primary" onClick={() => setAsideVis(!asideVis)}>
              探索磨山
            </Button>
          )} */}
        </Space>
      </aside>

      {asideVis && <ProgressSteps className="progress glass" />}

      <FloatButton.Group shape="square">
        <FloatButton
          type={isEagle ? "primary" : "default"}
          description="鸟瞰"
          onClick={handleEagle}
        />
        <FloatButton
          type={isMap ? "primary" : "default"}
          description="地图"
          onClick={handleMap}
        />
        <FloatButton
          type={isCompass ? "primary" : "default"}
          description="罗盘"
          onClick={handleCompass}
        />
      </FloatButton.Group>
    </>
  );
}
