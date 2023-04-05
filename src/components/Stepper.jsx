import { useState } from "react";
import { steps } from "../stores/constants";
import { Button, Divider, message, Steps } from "antd";
import { Page } from "./Page";
import useStore from "../stores";
import Test from "./Test";

export function Stepper() {
  const [current, setCurrent] = useStore((state) => [
    state.currentStep,
    state.updateCurrentStep,
  ]);

  // const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div>
      <Steps direction="vertical" current={current} items={items} />
      <Divider />
      <div>
        {current === steps.length - 1 && (
          <Test />
        )}
        <Page title={steps[current].title} content={steps[current].content} />
      </div>
      <Divider />
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("完成本章!")}>
            完成
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </div>
  );
}
