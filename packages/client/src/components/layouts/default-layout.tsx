"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AiOutlineCompass,
  AiOutlineRead,
  AiOutlineBook,
  AiOutlineTags,
} from "react-icons/ai";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    label: "书签",
    key: "/sites",
    icon: <AiOutlineCompass />,
  },
  {
    label: "阅读",
    key: "/articles",
    icon: <AiOutlineRead />,
  },
  {
    label: "标签",
    key: "/tags",
    icon: <AiOutlineTags />,
  },
  // {
  //   label: "备忘录",
  //   key: "/favorites",
  //   icon: <AiOutlineBook />,
  // },
];
export function DefaultLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([
    pathname,
  ]);

  const handleMenuItemClick: MenuProps["onClick"] = ({ key, keyPath }) => {
    router.push(key);
    setMenuSelectedKeys(keyPath);
  };

  return (
    <div className={"default-layout"}>
      <aside className={"default-layout-sidebar"}>
        <div className={"sidebar-top"}>
          <div className={"flex justify-center sidebar-avatar"}>
            <Avatar
              src={"https://api.dicebear.com/7.x/miniavs/svg?seed=1"}
              size={"large"}
            />
          </div>
          <div className={"mt-6 sidebar-nav"}>
            <Menu
              items={items}
              selectedKeys={menuSelectedKeys}
              style={{ width: "100%" }}
              inlineCollapsed={true}
              mode={"inline"}
              onClick={handleMenuItemClick}
            ></Menu>
          </div>
        </div>
        <div className={"sidebar-actions"}></div>
      </aside>
      <main className={"default-layout-content"}>{children}</main>
    </div>
  );
}
