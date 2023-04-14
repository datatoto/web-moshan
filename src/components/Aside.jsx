import { Button, Divider, Space } from "antd";
import { DesOne } from "./DesOne";
import { ASIDE } from "../stores/constants";
import { useCurrent, useCurrentCh, useIsCompass, useIsDome, useIsMap } from "../stores";
import { useEffect, useState } from "react";

export default function Aside(props) {
  const [current, nextCurrent] = useCurrent((state) => [
    state.current,
    state.nextCurrent,
  ]);

  const [currentCh, nextCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.nextCurrentCh,
  ]);

  function handleNextCh() {
    setCurrent(0);
    nextCurrentCh();
  }

  const [isMap, toggleMap] = useIsMap((state) => [
    state.isMap,
    state.toggleMap,
  ]);
  const [isCompass, toggleCompass] = useIsCompass((state) => [
    state.isCompass,
    state.toggleCompass,
  ]);
  const [isDome, toggleDome] = useIsDome((state) => [
    state.isDome,
    state.toggleDome,
  ]);

  return (
    <aside
      className="glass aside"
      style={{
        position: "absolute",
        top: "0px",
        width: "25vw",
        height: "98vh",
        padding: "0 10px",
        overflowY: "scroll",
        margin: "10px",
        zIndex: "5",
      }}
    >
      <DesOne current={current} nextCurrent={nextCurrent} />
      <Divider />
      {/* {currentCh < ASIDE.length - 1 && (
        <Button
          type="primary"
          onClick={handleNextCh}
          disabled={current < ASIDE[currentCh].steps.length - 1}
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
      <Space>
        <Button type="primary" onClick={() => toggleMap()}>
          {isMap ? "关闭地图" : "使用地图"}
        </Button>
        <Button type="primary" onClick={() => toggleCompass()}>
          {isCompass ? "关闭罗盘" : "使用罗盘"}
        </Button>
        <Button type="primary" onClick={() => toggleDome()}>
          {isDome ? "关闭全景" : "使用全景"}
        </Button>
      </Space>
    </aside>
  );
}
