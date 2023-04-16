import { Alert, Button, Divider, Steps } from "antd";
import { useState } from "react";

export function DesTwo({ current }) {
  return (
    <div>
      {current === 0 && (
        <>
          <Alert type="info" message="鼠标左键点击地图顺时针旋转地图，右键逆时针旋转。" />
          <p>
            旋转东湖磨山地质地图，使得地图的指北针和罗盘北针保持同一个方向。
          </p>
        </>
      )}
      {current === 1 && (
        <>
          <Alert type="info" message="鼠标左键点击地图添加标记点，右键删除标记点。" />
          <p>通过标定好的地图，确定标志性地物之间的相对关系。</p>
        </>
      )}
      {current === 2 && (
        <>
          <Alert type="info" message="收起地图进入罗盘观测模式，结合地图查看目标地物。" />
          <p>转动视角，查看南望山、喻家山在哪？</p>
        </>
      )}
    </div>
  );
}
