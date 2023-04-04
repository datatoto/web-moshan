import Typography from "antd/es/typography/Typography";

const { Paragraph } = Typography;

export function Page({ content }) {
  return (
    <Typography>
      {/* <Title level={3} style={{ textAlign: "center" }}>
        {title}
      </Title> */}
      <Paragraph>{content}</Paragraph>
    </Typography>
  );
}
