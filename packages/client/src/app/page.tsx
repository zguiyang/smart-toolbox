import { Button, Input, Space } from "antd";
export default function Home() {
  return (
    <div>
      <Space direction={"vertical"} size={24}>
        <Button type={"primary"}>按钮</Button>
        <Input type={"text"} style={{ width: "300px" }}></Input>
      </Space>
    </div>
  );
}
