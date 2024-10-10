"use client";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Button, Tooltip, AutoComplete, Input, Flex } from "antd";
import styles from "./page.module.scss";
export default function SitesPage() {
  return (
    <div className={styles.wrapper}>
      <div className={"lg:w-[1200px] md:w-full mx-auto"}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <AutoComplete
              popupMatchSelectWidth={500}
              style={{ width: 360 }}
              options={[]}
              size="large"
              variant={"filled"}
            >
              <Input
                variant={"filled"}
                size={"large"}
                prefix={<AiOutlineSearch size={20} />}
                placeholder={"输入名称进行搜索(⌘+F)"}
              ></Input>
            </AutoComplete>
          </div>
          <div className={styles.toolbarRight}>
            <Tooltip title={"添加书签"}>
              <Button
                type={"primary"}
                shape={"circle"}
                icon={<AiOutlinePlus />}
              ></Button>
            </Tooltip>
          </div>
        </div>
        <div className={styles.siteList}>
          <Flex wrap gap={"middle"}>
            <div className={"siteItem"}>
              <div></div>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
}
