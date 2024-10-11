"use client";

import { useEffect } from "react";

import { Button, Result } from "antd";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={"flex flex-auto items-center justify-center w-full h-full"}>
      <Result
        status="error"
        title="哎呀，出错了!"
        subTitle="请检查您的输入是否正确，或联系管理员。"
        extra={[
          <Button key="reset" type={"primary"} onClick={reset}>
            重试
          </Button>,
        ]}
      ></Result>
    </div>
  );
}
