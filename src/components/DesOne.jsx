import { Alert, Button, Divider, Steps, Typography } from "antd";
import { useState } from "react";
const { Title, Paragraph, Text, Link } = Typography;

export function DesOne({ current }) {
  return (
    <div>
      {current === 0 && (
        <Typography>
          <Alert type="info" message="点击刻度螺旋，调整盘面刻度。" />
          <Divider />
          <Paragraph>
            旋动罗盘侧边的刻度螺旋，使水平刻度盘向左或向右转动，(磁偏角东偏则向右，西偏则向左)，使罗盘底盘南北刻度线与水平刻度盘0～180°连线间夹角等于磁偏角。
          </Paragraph>

          <Paragraph>
            根据Noaa组织提供的数据，磨山地区的磁偏角为-4°56′。使用用户应该向左u逆时针旋转罗盘侧边的刻度螺旋，使得罗盘底盘南北刻度线与水平刻度盘0～180°连线间夹角等于4°56′，也就是水平度盘上的指针从0指向<Text mark>4°56′</Text>。
          </Paragraph>
        </Typography>
      )}
      {current === 1 && (
        <>
          <Alert type="info" message="点击圆水准器，调整罗盘。" />
          <p>
            通过调节倾角使罗盘的长水准器的气泡在红线范围内，再通过调整方位使罗盘的圆水准器里的气泡移动在红圈范围内。
          </p>
        </>
      )}
      {current === 2 && (
        <>
          <p>
            方式一（适用于观测物在自己下方或水平线上）：把罗盘抬到眼前，使罗盘瞄准觇板指向测量地物，即使罗盘南端对着测量地物，北端靠着自己，透过瞄准觇板上可以翻折的小孔进行瞄准，使测量地物与反光镜上的椭圆孔处于一条直线上，同时调整反光镜中圆形水准器和长水准器的气泡在红圈内，待指针稳定后，按下刺针制动器，进行读数。
          </p>
          <p>
            方式二（适用于观测物在自己上方）：把罗盘放置胸前，使罗盘瞄准觇板指向测量地物，即使罗盘北端对着测量地物，南端靠着自己，低头查看反光镜，使得反光镜上的细线、瞄准觇板尖端和测量地物处于同一条直线，待指针稳定后，按下磁针制动器，进行读数。
          </p>
        </>
      )}
      {current === 3 && <p>读出在水平度盘上北针的指数。</p>}
    </div>
  );
}
