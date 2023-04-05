import { Space } from "antd";
import Choice from "./Choice";

import { tests } from "../stores/constants";

export default function Test() {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {tests.map((t) => (
        <Choice test={t} />
        // <li key={t.title}>{t.title}</li>
      ))}
    </Space>
  );
}
