import { Button, Card, Divider, Image, Steps } from "antd";
import { useState } from "react";

const STEPS = [
  {
    title: "实验理论",
  },
  {
    title: "实验示例",
  },
];

const items = STEPS.map((i) => ({ key: i.title, title: i.title }));

// TODO
// const ExampleCard = (title, image, exampleData) => {
//   return (
//     <Card
//       className="glass"
//       title="设确定站立点 P 在地图中的位置"
//       cover={<img alt="example" src="src/assets/p1.png" />}
//     >
//       <ol>
//         <li>通过罗盘确定北方；</li>
//         <li>找到两个明显地物A、B；</li>
//         <li>
//           利用罗盘测量PA、PB的方向角a, b，其中a,
//           b也是AP、BP的方向，AP与BP的交点为P；
//         </li>
//         <li>在地图上过A点绘制方向角为a的直线；过B点绘制方向角为b的直线；</li>
//         <li>两直线的交点为P的近似点。</li>
//       </ol>
//     </Card>
//   );
// };

export function DesThree({ current, nextCurrent, preCurrent, handleNextCh }) {
  return (
    <div>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        确定目标点
      </h3>
      <Steps direction="vertical" current={current} items={items} />
      <Divider />
      {/* <p>{steps[current].content}</p> */}
      {current === 0 && (
        <>
          <p>
            在远处选定两个地图上也有的明显地形点，分别记录明显地形点相对于现在位置的方位角，在已经标定好的地图上，从两个明显地形点沿长尺边画出方向线，两方向线的交点即为站立点的图上位置。
          </p>
          <Card
            className="glass"
            title="设确定站立点 P 在地图中的位置"
            cover={<img alt="example" src="src/assets/p1.png" />}
          >
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
          </Card>
        </>
      )}
      {current === 1 && (
        <>
          <p>记录东湖之眼在哪，记录方位。</p>
        </>
      )}

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
      </div>
    </div>
  );
}
