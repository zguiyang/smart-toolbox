import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppLayout from "@/components/layouts/app-layout";

import "dayjs/locale/zh-cn";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "Smart Toolbox",
  description: "个人工具箱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`antialiased`}>
        <AntdRegistry>
          <AppLayout>{children}</AppLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
