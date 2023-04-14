import { Button, Divider, Space } from "antd";
import { Stepper } from "./Stepper";
import { ASIDE } from "../stores/constants";
import { useCurrentCh, useIsCompass, useIsMap } from "../stores";
import { useEffect, useState } from "react";

export default function Aside(props) {
  const [currentCh, nextCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.nextCurrentCh,
  ]);

  const [current, setCurrent] = useState(0);
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
      <h3
        style={{
          textAlign: "center",
        }}
      >
        {ASIDE[currentCh].title}
      </h3>
      <Stepper
        data={ASIDE[currentCh]}
        current={current}
        setCurrent={setCurrent}
      />
      <Divider />
      {currentCh < ASIDE.length - 1 && (
        <Button
          type="primary"
          onClick={handleNextCh}
          disabled={current < ASIDE[currentCh].steps.length - 1}
        >
          下一章
        </Button>
      )}
      <Divider />
      <Space>
        <Button type="primary" onClick={() => toggleMap()}>
          {isMap ? "关闭地图" : "使用地图"}
        </Button>
        <Button type="primary" onClick={() => toggleCompass()}>
          {isCompass ? "关闭罗盘" : "使用罗盘"}
        </Button>
      </Space>
    </aside>
  );
}
