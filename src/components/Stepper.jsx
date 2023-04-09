// import { useState } from "react";
import { Button, Divider, message, Steps } from "antd";
import useStore from "../stores";
import Test from "./Test";

export function Stepper({ steps }) {
  const [currentSe, setCurrentSection] = useStore((state) => [
    state.currentStep,
    state.updateCurrentStep,
  ]);

  const [currentCh, setCurrentCh] = useStore((state) => [
    state.currentCh,
    state.updateCurrentCh,
  ]);

  // const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrentSection(currentSe + 1);
  };

  const prev = () => {
    setCurrentSection(currentSe - 1);
  };

  const nextCh = () => {
    setCurrentCh(currentCh + 1);
    setCurrentSection(0);
    console.log(currentCh);
  };

  const items = steps.map((step) => ({ key: step.title, title: step.title }));

  return (
    <div>
      <Steps direction="vertical" current={currentSe} items={items} />
      <Divider style={{ backgroundColor: "black" }} />
      <div>
        {currentSe === steps.length - 1 && <Test />}
        <p>{steps[currentSe].content}</p>
        {/* <Page content={steps[current].content} /> */}
      </div>
      <Divider style={{ backgroundColor: "black" }} />
      <div>
        {currentSe < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {currentCh < 4 && currentSe === steps.length - 1 && (
          <Button type="primary" onClick={() => nextCh()}>
            下一章
          </Button>
        )}
        {currentSe > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </div>
  );
}
