"use client";

import { Avatar } from "antd";
export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"default-layout"}>
      <div className={"default-layout-sidebar"}>
        <div className={"sidebar-top"}>
          <div className={"flex justify-center sidebar-avatar"}>
            <Avatar
              src={"https://api.dicebear.com/7.x/miniavs/svg?seed=1"}
              size={"large"}
            />
          </div>
          <div className={"sidebar-nav"}></div>
        </div>
        <div className={"sidebar-actions"}></div>
      </div>
      <div className={"default-layout-content"}>{children}</div>
    </div>
  );
}
