import { Button, Divider, Steps } from "antd";
import { Compass } from "../models/Compass";
import { Ground } from "../models/Ground";
import { useState } from "react";
import Test from "./Test";
import useStore from "../stores";

export function Stepper({ data, currentCh, setCurrentCh }) {
  const [current, setCurrent] = useState(0);
  // const [currentCh, setCurrentCh] = useStore((state) => [
  //   state.currentCh,
  //   state.updateCurrentCh,
  // ]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const nextCh = () => {
    setCurrent(0);
    setCurrentCh(currentCh + 1);
  };

  const steps = data.steps;
  const items = steps.map((i) => ({ key: i.title, title: i.title }));

  return (
    <div>
      <Steps direction="vertical" current={current} items={items} />
      <Divider />
      {/* {current === 4 && <Test items={TESTS} />} */}
      <p>{steps[current].content}</p>
      <div style={{ marginTop: 12 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {currentCh < 3 && current === steps.length - 1 && (
          <Button type="primary" onClick={() => nextCh()}>
            下一章
          </Button>
        )}
        {/* {currentCh === 3 && (
          <Button type="primary" disabled>
            开始探索
          </Button>
        )} */}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </div>
  );
}
