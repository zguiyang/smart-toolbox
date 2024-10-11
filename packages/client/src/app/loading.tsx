import { Spin } from "antd";

export default function Loading() {
  return (
    <div className={"flex flex-auto justify-center items-center h-full w-full"}>
      <Spin size={"large"} />
    </div>
  );
}
