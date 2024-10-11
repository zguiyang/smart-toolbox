"use client";

import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineTags,
  AiOutlineStar,
} from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { IoExitOutline } from "react-icons/io5";
import {
  Button,
  Tooltip,
  AutoComplete,
  Input,
  Flex,
  Row,
  Col,
  Avatar,
  Space,
  Checkbox,
  Tag,
  Typography,
  Dropdown,
} from "antd";
import clsx from "clsx";

import styles from "./page.module.scss";
export default function SitesPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <AutoComplete
            popupMatchSelectWidth={500}
            style={{ width: 360 }}
            options={[]}
            variant={"filled"}
          >
            <Input
              variant={"filled"}
              size={"large"}
              prefix={<AiOutlineSearch size={20} />}
              suffix={<Typography.Text keyboard={true}>⌘K</Typography.Text>}
              placeholder={"输入名称进行搜索"}
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
      <div className={styles.actionBar}>
        <div className={"flex items-center space-x-2"}>
          <Checkbox>所有</Checkbox>
          <span className={"text-gray-400 font-medium"}>已选中1项</span>
        </div>
        <div className={"flex items-center space-x-4"}>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "0",
                  label: "设置为星标",
                  icon: <AiOutlineStar />,
                },
                {
                  type: "divider",
                },
                {
                  key: "1",
                  label: "删除",
                  icon: <IoExitOutline />,
                },
                {
                  key: "2",
                  label: "移动到",
                  icon: <AiOutlineTags />,
                },
              ],
            }}
          >
            <Tooltip title={"批量操作网页书签"}>
              <Button type={"default"} color={"primary"} shape={"round"}>
                <SlOptions />
              </Button>
            </Tooltip>
          </Dropdown>
          <Button type={"primary"} icon={<IoExitOutline />}>
            退出操作
          </Button>
        </div>
      </div>
      <div className={styles.siteListRowWrapper}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div className={styles.siteListRow} key={i}>
            <h4 className={styles.siteListRowTitle}>最近访问</h4>
            <div className={styles.siteList}>
              <Row gutter={[16, 16]} wrap>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <Col key={index} span={6}>
                      <div className={clsx(styles.siteItem)} key={index}>
                        <div className={styles.siteItemSelectButton}>
                          <Checkbox />
                        </div>
                        <div className={"mb-4 flex items-start"}>
                          <div className={styles.siteItemLogo}>
                            <Avatar
                              size={"large"}
                              src={"https://api.vvhan.com/api/avatar/recommend"}
                            />
                          </div>
                          <div className={styles.siteItemContent}>
                            <h6 className={styles.siteItemTitle}>Behance</h6>
                            <Tooltip
                              title={
                                "Adobe旗下的设计师交流平台，来自世界各地的设计师在这里分享自己的行品。"
                              }
                            >
                              <p className={styles.siteItemDescription}>
                                Adobe旗下的设计师交流平台，来自世界各地的设计师在这里分享自己的行品。
                              </p>
                            </Tooltip>
                          </div>
                        </div>
                        <div className={styles.siteItemTags}>
                          <Flex gap={"0"}>
                            <Space wrap={true} size={4}>
                              <Tag>设计</Tag>
                              <Tag>UI</Tag>
                              <Tag>UX</Tag>
                            </Space>
                            <span className={styles.siteItemTagAdd}>
                              <Button type={"text"} size={"small"}>
                                <AiOutlineTags />
                              </Button>
                            </span>
                          </Flex>
                        </div>
                        <div className={styles.siteItemActions}>
                          <Space size={"small"}></Space>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
