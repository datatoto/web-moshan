import Typography from "antd/es/typography/Typography";

const { Title, Paragraph, Text } = Typography;

export function Page() {
  return (
    <Typography>
      <Title level={3} style={{ textAlign: "center" }}>
        磁偏角的校正
      </Title>
      <Paragraph>
        旋动罗盘侧边的刻度螺旋，使水平刻度盘向左或向右转动，(磁偏角东偏则向右，西偏则向左)，使罗盘底盘南北刻度线与水平刻度盘0～180°连线间夹角等于磁偏角。经校正后测量时的读数就为真方位角。
      </Paragraph>
      <Paragraph>
        根据Noaa组织提供的数据，磨山地区的磁偏角为-4°56′。使用用户应该向左逆时针旋转罗盘侧边的刻度螺旋，使得罗盘底盘南北刻度线与水平刻度盘0～180°连线间夹角等于4°56′，也就是水平度盘上的指针从0指向4°56′。
      </Paragraph>
    </Typography>
  );
}
