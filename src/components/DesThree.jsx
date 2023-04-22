import { Alert, Button, Card, Divider, Image, Space, Steps } from "antd";
import { useState } from "react";
import { Blank } from "./Test";

import cardImage from "../assets/p1.png";

const BLANKS = [
  {
    title: "记录摩天轮相对自己的角度",
    answer: 45,
    score: 5,
  },
  {
    title: "记录南望山相对自己的角度",
    answer: 20,
    score: 5,
  },
  {
    title: "记录喻家山相对自己的角度",
    answer: 60,
    score: 5,
  },
];

export function DesThree({ current }) {
  return (
    <div>
      {current === 0 && (
        <>
          <Alert
            type="info"
            message="通过键盘 WASD 键控制人物运动；进入罗盘观测模式，使用 WD 键调节罗盘旋转角度。"
          />
          <Divider />
          <Image
            width={250}
            src={cardImage}
            
          />
          <h3>设确定站立点 P 在地图中的位置</h3>
          <ol>
            <li>通过罗盘确定北方；</li>
            <li>找到两个明显地物A、B；</li>
            <li>
              利用罗盘测量PA、PB的方向角a, b，其中a,
              b也是AP、BP的方向，AP与BP的交点为P；
            </li>
            <li>
              在地图上过A点绘制方向角为a的直线；过B点绘制方向角为b的直线；
            </li>
            <li>两直线的交点为P的近似点。</li>
          </ol>
          {/* <Card
            className="glass"
            cover={<img alt="example" src={cardImage} />}
          >
            <h3>设确定站立点 P 在地图中的位置</h3>
            <ol>
              <li>通过罗盘确定北方；</li>
              <li>找到两个明显地物A、B；</li>
              <li>
                利用罗盘测量PA、PB的方向角a, b，其中a,
                b也是AP、BP的方向，AP与BP的交点为P；
              </li>
              <li>
                在地图上过A点绘制方向角为a的直线；过B点绘制方向角为b的直线；
              </li>
              <li>两直线的交点为P的近似点。</li>
            </ol>
          </Card> */}
          {/* <Divider />
          <p>
            在远处选定两个地图上也有的明显地形点，分别记录明显地形点相对于现在位置的方位角，在已经标定好的地图上，从两个明显地形点沿长尺边画出方向线，两方向线的交点即为站立点的图上位置。
          </p> */}

        </>
      )}
      {current === 1 && (
        <>
          <Alert type="info" message="结合罗盘和地图完成下面的探索性实验。" />
          <Divider />
          <Space direction="vertical" style={{ width: "100%" }}>
            {BLANKS.map((t) => (
              <Blank test={t} />
            ))}
          </Space>
        </>
      )}

      {/* <Divider />
      <Space>
        {current < STEPS.length - 1 && (
          <Button type="primary" onClick={() => nextCurrent()}>
            下一步
          </Button>
        )}
        {current > 0 && (
          <Button onClick={() => preCurrent()}>
            上一步
          </Button>
        )}
        {current === STEPS.length - 1 && (
          <Button type="primary" onClick={() => handleNextCh()}>
            下一章
          </Button>
        )}
      </Space> */}
    </div>
  );
}
