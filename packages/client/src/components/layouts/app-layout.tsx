"use client";

import { ConfigProvider, App } from "antd";
import zhCN from "antd/locale/zh_CN";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        hashed: false,
        components: {
          Menu: {
            collapsedIconSize: 24,
            iconSize: 18,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
