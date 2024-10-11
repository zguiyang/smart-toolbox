"use client";

import { useRouter } from "next/navigation";
import { Button, Result } from "antd";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className={"flex flex-auto items-center justify-center w-full h-full"}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在"
        extra={[
          <Button
            key="back"
            type={"primary"}
            onClick={() => router.replace("/")}
          >
            返回首页
          </Button>,
        ]}
      ></Result>
    </div>
  );
}
