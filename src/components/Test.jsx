import { Alert, Divider, Radio, Space } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";

function Choice({ test }) {
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Card style={{ width: "100%" }} className="glass">
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

export default function Test({ items }) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {items.map((t) => (
        <Choice test={t} key={t.title} />
      ))}
    </Space>
  );
}
