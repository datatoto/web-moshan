import { Button, Divider, FloatButton, Space } from "antd";
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

export default function Aside(props) {
  const [current, nextCurrent, preCurrent, resetCurrent] = useCurrent(
    (state) => [
      state.current,
      state.nextCurrent,
      state.preCurrent,
      state.resetCurrent,
    ]
  );

  const [currentCh, nextCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.nextCurrentCh,
  ]);

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

  // const [isTest, setTest] = useState(false);

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
          width: currentCh === 4 ? "80vw" : "25vw",
          height: "98vh",
          padding: "0 10px",
          overflowY: "scroll",
          margin: "10px",
          zIndex: "5",
          visibility: isEagle ? "hidden" : "visible",
        }}
      >
        {currentCh === 0 && (
          <DesOne
            current={current}
            nextCurrent={nextCurrent}
            preCurrent={preCurrent}
            handleNextCh={handleNextCh}
          />
        )}
        {currentCh === 1 && (
          <DesTwo
            current={current}
            nextCurrent={nextCurrent}
            preCurrent={preCurrent}
            handleNextCh={handleNextCh}
          />
        )}
        {currentCh === 2 && (
          <DesThree
            current={current}
            nextCurrent={nextCurrent}
            preCurrent={preCurrent}
            handleNextCh={handleNextCh}
          />
        )}
        {currentCh === 3 && (
          <DesFour
            current={current}
            nextCurrent={nextCurrent}
            preCurrent={preCurrent}
            handleNextCh={handleNextCh}
          />
        )}
        {currentCh === 4 && <Test />}
        {/* {isTest && <Test />} */}
        <Divider />
        {/* {currentCh < 3 && (
        <Button
          type="primary"
          onClick={handleNextCh}
          disabled={current < }
        >
          下一章
        </Button>
      )} */}
        {/* {
        (current === ASIDE[currentCh].steps.length && (
          <Button type="primary">进行测验</Button>
        ))
      } */}
        {/* <Divider /> */}
        {/* <Space> */}
        {/* <Button type="primary" onClick={() => toggleMap(!isMap)}>
            {isMap ? "关闭地图" : "使用地图"}
          </Button>
          <Button type="primary" onClick={() => toggleCompass(!isCompass)}>
            {isCompass ? "关闭罗盘" : "使用罗盘"}
          </Button> */}
        {/* <Button type="primary" onClick={handleEagle}>
            {isEagle ? "关闭鸟瞰" : "开启鸟瞰"}
          </Button> */}
        {/* <Button type="primary" onClick={() => toggleDome()}>
          {isDome ? "关闭全景" : "使用全景"}
        </Button> */}
        {/* </Space> */}
      </aside>
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
