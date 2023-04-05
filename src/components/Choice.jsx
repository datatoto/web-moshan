import { Alert, Divider, Radio, Space } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";

export default function Choice({ test }) {
  const [value, setValue] = useState(null);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Card style={{ width: "100%" }}>
      <h3>{test.title}</h3>
      <Divider />
      <Radio.Group onChange={onChange} value={value}>
        {test.radios.map((r, i) => (
          <Radio value={i} key={i} style={{ padding: "5px 0" }}>
            {r}
          </Radio>
        ))}
      </Radio.Group>
      <Divider />
      {value === test.answer && <Alert message="正确" type="success" />}
    </Card>
  );
}
