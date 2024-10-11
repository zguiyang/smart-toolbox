"use client";

import { TbCategoryPlus, TbBookmarkEdit } from "react-icons/tb";
import { Typography, Space, Collapse } from "antd";

import styles from "./layout.module.scss";

export default function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.sider}>
        <Space direction={"vertical"} size={8}>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            网页书签
          </Typography.Title>
          <Typography.Text type={"secondary"}>
            收藏的所有网站书签
          </Typography.Text>
        </Space>
        <div className={"mt-4"}>
          {/*<Menu*/}
          {/*  mode={"vertical"}*/}
          {/*  style={{ width: "100%", border: 0 }}*/}
          {/*  selectedKeys={menuSelectedKeys}*/}
          {/*  items={[*/}
          {/*    {*/}
          {/*      label: "我的书签",*/}
          {/*      key: "/sites",*/}
          {/*      icon: <AiOutlineStar />,*/}
          {/*    },*/}
          {/*    {*/}
          {/*      label: "书签管理",*/}
          {/*      key: "/sites/manage",*/}
          {/*      icon: <TbBookmarkEdit />,*/}
          {/*    },*/}
          {/*    {*/}
          {/*      label: "书签分类",*/}
          {/*      key: "/sites/categories",*/}
          {/*      icon: <TbCategoryPlus />,*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  onClick={({ key, keyPath }) => {*/}
          {/*    setMenuSelectedKeys(keyPath);*/}
          {/*    router.push(key);*/}
          {/*  }}*/}
          {/*></Menu>*/}
          <Collapse
            expandIconPosition={"right"}
            bordered={false}
            ghost={true}
            items={[
              {
                label: "书签分类",
                key: "/sites/manage",
                children: "书签分类内容",
                classNames: {
                  header: "custom-header",
                },
                extra: <span className={"text-secondary"}>Beta</span>,
              },
              {
                label: "星标书签",
                key: "/sites/categories",
                children: "星标书签内容",
              },
            ]}
          ></Collapse>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
