import { Button, Divider, Steps } from "antd";
import { Compass } from "../models/Compass";
import { Ground } from "../models/Ground";
import { useState } from "react";
import Test from "./Test";
import Aside from "./Aside";

const DATA = [
  {
    title: "磁偏角校正",
    content: `旋动罗盘侧边的刻度螺旋，使水平刻度盘向左或向右转动，(磁偏角东偏则向右，西偏则向左)，使罗盘底盘南北刻度线与水平刻度盘0～180°连线间夹角等于磁偏角。
      经校正后测量时的读数就为真方位角。根据Noaa组织提供的数据，磨山地区的磁偏角为-4°56′。使用用户应该向左逆时针旋转罗盘侧边的刻度螺旋，使得罗盘底盘南北刻度线与水平刻度盘0～180°连线间夹角等于4°56′，也就是水平度盘上的指针从0指向4°56′。`,
    cameraPosition: [-3, 3, -1],
    cameraLookAt: [0, 1.5, 0],
  },
  {
    title: "平持罗盘",
    content:
      "通过调节倾角使罗盘的长水准器的气泡在红线范围内，再通过调整方位使罗盘的圆水准器里的气泡移动在红圈范围内。",
    cameraPosition: [0, 4, 2],
    cameraLookAt: [0, 1.5, 0],
  },
  {
    title: "对准测物",
    content:
      "方式一（适用于观测物在自己下方或水平线上）：把罗盘抬到眼前，使罗盘瞄准觇板指向测量地物，即使罗盘南端对着测量地物，北端靠着自己，透过瞄准觇板上可以翻折的小孔进行瞄准，使测量地物与反光镜上的椭圆孔处于一条直线上，同时调整反光镜中圆形水准器和长水准器的气泡在红圈内，待指针稳定后，按下刺针制动器，进行读数。\n方式二（适用于观测物在自己上方）：把罗盘放置胸前，使罗盘瞄准觇板指向测量地物，即使罗盘北端对着测量地物，南端靠着自己，低头查看反光镜，使得反光镜上的细线、瞄准觇板尖端和测量地物处于同一条直线，待指针稳定后，按下磁针制动器，进行读数。",
    cameraPosition: [0, 3, 4],
    cameraLookAt: [0, 1.5, 0],
  },
  {
    title: "进行读数",
    content: "读出在水平度盘上北针的指数即可。",
    cameraPosition: [0, 4, 2],
    cameraLookAt: [0, 1.5, 0],
  },
  {
    title: "测验",
    content: "",
    cameraPosition: [0, 4, 2],
    cameraLookAt: [0, 1.5, 0],
  },
];

const TESTS = [
  {
    title: "用地质罗盘瞄准目的物时，下面哪些描述是正确的？",
    radios: [
      "瞄准时眼睛、反光镜上的细线和目的物应该处于一条直线上",
      "瞄准目的物时，应该按住磁针制动器，保证瞄准时，磁针不左右晃动",
      "先瞄准目的物，再调整地质罗盘上的水准仪",
      "不管目的物处于视线上方还是下方，使用罗盘进行瞄准的方式都一样",
    ],
    answer: 0,
  },
  {
    title: `利用地质罗盘进行定位时的使用步骤？
    1.记录方位刻度盘读数
    2.地质罗盘磁偏角校正
    3.使用地质罗盘进行瞄准
    4.调整地质罗盘方位水准器，使气泡位于误差范围内
    5.确定待测目标的大致位置
    6.待磁针稳定后，按下磁针制动器
    `,
    radios: ["425316", "654321", "462513", "254361"],
    answer: 4,
  },
  {
    title: "当目标地物在实现的不同高度的时候，应该怎么拿地质罗盘进行瞄准？",
    radios: [
      "目标地物位于视线下方或与视线齐平时，把罗盘放置胸前，使罗盘瞄准觇板指向测量地物，即使罗盘北端对着测量地物，南端靠着自己，低头查看反光镜，使得反光镜上的细线、瞄准觇板尖端和测量地物处于同一条直线，待指针稳定后，按下磁针制动器，进行读数。",
      "当目标地物位于视线上方时，把罗盘放置胸前，使罗盘瞄准觇板指向测量地物，即使罗盘北端对着测量地物，南端靠着自己，低头查看反光镜，使得反光镜上的细线、瞄准觇板尖端和测量地物处于同一条直线，待指针稳定后，按下磁针制动器，进行读数。",
      "当目标地物位于位于视线上方时,把罗盘抬到眼前，使罗盘瞄准觇板指向测量地物，即使罗盘南端对着测量地物，北端靠着自己，透过瞄准觇板上可以翻折的小孔进行瞄准，使测量地物与反光镜上的椭圆孔处于一条直线上，同时调整反光镜中圆形水准器和长水准器的气泡在红圈内，待指针稳定后，按下磁针制动器，进行读数。",
      "不论目的地物相对于自己视角的高度,都可以把罗盘抬到眼前，使罗盘瞄准觇板指向测量地物，即使罗盘南端对着测量地物，北端靠着自己，透过瞄准觇板上可以翻折的小孔进行瞄准，使测量地物与反光镜上的椭圆孔处于一条直线上，同时调整反光镜中圆形水准器和长水准器的气泡在红圈内，待指针稳定后，按下磁针制动器，进行读数。",
    ],
    answer: 2,
  },
];

export function Stepper({ children }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = DATA.map((i) => ({ key: i.title, title: i.title }));

  return (
    <div>
      <Steps direction="vertical" current={current} items={items} />
      <Divider />
      {current === 4 && <Test items={TESTS} />}
      <p>{DATA[current].content}</p>
      <div style={{ marginTop: 12 }}>
        {current < 4 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === 4 && (
          <Button type="primary" onClick={() => message.success("完成本章!")}>
            完成本章
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