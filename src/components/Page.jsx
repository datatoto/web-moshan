import Typography from "antd/es/typography/Typography";

const { Title, Paragraph, Text } = Typography;

export function Page({ title, content }) {
  return (
    <Typography style={{ margin: "10px 0px" }}>
      {/* <Title level={3} style={{ textAlign: "center" }}>
        {title}
      </Title> */}
      <Paragraph>{content}</Paragraph>
    </Typography>
  );
}
