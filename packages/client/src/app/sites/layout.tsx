"use client";

import React, { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { TbCategoryPlus, TbBookmarkEdit } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { Typography, Space, Menu } from "antd";
import styles from "./layout.module.scss";

export default function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([
    pathname,
  ]);

  return (
    <div className={styles.layout}>
      <div className={styles.sider}>
        <Space direction={"vertical"} size={8}>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            网站书签
          </Typography.Title>
          <Typography.Text type={"secondary"}>
            收藏的所有网站书签
          </Typography.Text>
        </Space>
        <div className={"mt-4"}>
          <Menu
            mode={"vertical"}
            style={{ width: "100%", border: 0 }}
            selectedKeys={menuSelectedKeys}
            items={[
              {
                label: "我的书签",
                key: "/sites",
                icon: <AiOutlineStar />,
              },
              {
                label: "书签管理",
                key: "/sites/manage",
                icon: <TbBookmarkEdit />,
              },
              {
                label: "书签分类",
                key: "/sites/categories",
                icon: <TbCategoryPlus />,
              },
            ]}
            onClick={({ key, keyPath }) => {
              setMenuSelectedKeys(keyPath);
              router.push(key);
            }}
          ></Menu>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
