"use client";

import { Typography, Space } from "antd";
import {
  AiOutlineInbox,
  AiOutlineStar,
  AiOutlineAppstore,
  AiOutlineEye,
} from "react-icons/ai";

import { PageContainer } from "@/components/layouts/page-container";
import { SideContainer } from "@/components/layouts/side-container";

import styles from "./layout.module.scss";

export default function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <SideContainer>
        <Space direction={"vertical"} size={8}>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            网页书签
          </Typography.Title>
          <Typography.Text type={"secondary"}>
            收藏的所有网站书签
          </Typography.Text>
        </Space>
        <div className={"mt-4"}>
          <ul className={"space-y-2"}>
            <li
              className={
                "cursor-pointer text-gray-500 p-2 bg-gray-100 rounded-md flex items-center hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 ease-in-out"
              }
            >
              <AiOutlineInbox size={18} className={"mr-2"} />
              <div className={"flex-1  font-medium truncate justify-center"}>
                收集箱
              </div>
              <span>10</span>
            </li>
            <li
              className={
                "cursor-pointer text-gray-500 p-2 bg-gray-100 rounded-md flex items-center hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 ease-in-out"
              }
            >
              <AiOutlineEye size={18} className={"mr-2"} />
              <div className={"flex-1  font-medium truncate justify-center"}>
                近期访问
              </div>
              <span>10</span>
            </li>
            <li
              className={
                "cursor-pointer text-gray-500 p-2 bg-gray-100 rounded-md flex items-center hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 ease-in-out"
              }
            >
              <AiOutlineAppstore size={18} className={"mr-2"} />
              <div className={"flex-1  font-medium truncate justify-center"}>
                所有
              </div>
              <span>10</span>
            </li>
            <li className={"cursor-pointer p-2 bg-gray-100 rounded-md flex"}>
              <AiOutlineStar size={18} className={"mr-2"} />
              <div
                className={
                  "flex-1 text-gray-600 truncate font-medium justify-center"
                }
              >
                星标
              </div>
              <span className={"text-gray-400 font-medium"}>10</span>
            </li>
          </ul>
        </div>
      </SideContainer>
      <section className={styles.content}>
        <PageContainer>{children}</PageContainer>
      </section>
    </div>
  );
}
