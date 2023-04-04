import { useState } from "react";
import { steps } from "../stores";
import { Button, Divider, message, Steps } from "antd";
import { Page } from "./Page";

export function Stepper() {
  const [current, setCurrent] = useState(0);

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
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
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
