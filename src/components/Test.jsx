import { Alert, Divider, Radio, Space } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";

const CHOICES = [
  {
    title: "用地质罗盘瞄准目的物时，下面哪些描述是正确的？",
    radios: [
      "瞄准时眼睛、反光镜上的细线和目的物应该处于一条直线上",
      "瞄准目的物时，应该按住磁针制动器，保证瞄准时，磁针不左右晃动",
      "先瞄准目的物，再调整地质罗盘上的水准仪",
      "不管目的物处于视线上方还是下方，使用罗盘进行瞄准的方式都一样",
    ],
    answer: 0,
    score: 5,
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
    answer: 3,
    score: 10,
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
    score: 5,
  },
  {
    title: "以下哪个关于地形图的描述是正确的？",
    radios: [
      "等高线之间的距离越小，表示地形越平缓",
      "本次实验中用到的地形图的计曲线等高距为25m",
      "只有在山区地形中才需要使用等高线",
      "通常用线状符号来标记地形高度或者点位信息",
    ],
    answer: 2,
    score: 5,
  },
];

function Choice({ test }) {
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Card style={{ width: "100%" }}>
      <h3>{test.title}</h3>
      <Radio.Group onChange={onChange} value={value}>
        {test.radios.map((r, i) => (
          <Radio value={i} key={i} style={{ padding: "5px 0" }}>
            {r}
          </Radio>
        ))}
      </Radio.Group>
      {value === test.answer && <Alert message="正确" type="success" />}
    </Card>
  );
}

export default function Test() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {CHOICES.map((t) => (
        <Choice test={t} key={t.title} />
      ))}
    </Space>
  );
}
