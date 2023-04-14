import { Button, Divider } from "antd";
import { Stepper } from "./Stepper";
import { ASIDE } from "../stores/constants";
import { useCurrentCh } from "../stores";
import { useEffect, useState } from "react";

export default function Aside(props) {
  const [currentCh, nextCurrentCh] = useCurrentCh((state) => [
    state.currentCh,
    state.nextCurrentCh,
  ]);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  function handleNextCh() {
    setCurrent(0);
    nextCurrentCh();
  }

  useEffect(() => {
    console.log(ASIDE[currentCh].length);
  });

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
    </aside>
  );
}
