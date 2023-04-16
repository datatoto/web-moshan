import { Button, Divider, Steps } from "antd";
import { useState } from "react";

export function DesTwo({ current }) {
  return (
    <div>
      {/* <h3
        style={{
          textAlign: "center",
        }}
      >
        标定地图
      </h3>
      <Steps direction="vertical" current={current} items={items} />
      <Divider /> */}
      {/* <p>{steps[current].content}</p> */}
      {current === 0 && (
        <p>旋转东湖磨山地质地图，使得地图的指北针和罗盘北针保持同一个方向。</p>
      )}
      {current === 1 && (
        <>
          <p>通过标定好的地图，确定标志性地物之间的相对关系。</p>
        </>
      )}
      {current === 2 && (
        <>
          <p>转动视角，查看南望山、喻家山在哪？</p>
        </>
      )}
      {/* 
      <Divider />
      <div>
        {current < STEPS.length - 1 && (
          <Button type="primary" onClick={() => nextCurrent()}>
            下一步
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => preCurrent()}>
            上一步
          </Button>
        )}
        {current === STEPS.length - 1 && (
          <Button type="primary" onClick={() => handleNextCh()}>
            下一章
          </Button>
        )}
      </div> */}
    </div>
  );
}
