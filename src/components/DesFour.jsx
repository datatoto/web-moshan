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

export function DesFour({ current, nextCurrent, preCurrent, handleNextCh }) {
  return (
    <div>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        确定站立点
      </h3>
      <Steps direction="vertical" current={current} items={items} />
      <Divider />
      {/* <p>{steps[current].content}</p> */}
      {current === 0 && (
        <>
          <p>
            当目标点较远且附近又无明显地形点时，可在两个测站点上用前方交会法确定目标点在图上的位置。
          </p>
          <Card
            className="glass"
            title="设确定目标点 A 在地图中的位置"
            cover={<img alt="example" src="src/assets/p2.png" />}
          >
            <ol>
              <li>
                选定现地与图上都有的二至三个明显地形点，如P1、P2点作为测站点；
              </li>
              <li>
                在第P1点上先标定地图，确定该点图上位置；再以指北针直尺边切该点向现地目标点瞄准后，并向前画方向线；
              </li>
              <li>
                以同样方法在第P2点上描画方向线，两方向线的交点A就是目标点的图上位置。
              </li>
            </ol>
          </Card>
        </>
      )}
      {current === 1 && (
        <>
          <p>在地图上标出特殊地物的位置</p>
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
            进行测验
          </Button>
        )}
      </div>
    </div>
  );
}
