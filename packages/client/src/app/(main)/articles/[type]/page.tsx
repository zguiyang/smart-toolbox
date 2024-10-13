"use client";

import { AiOutlineTags, AiOutlineStar } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { IoExitOutline } from "react-icons/io5";
import {
  Button,
  Tooltip,
  Flex,
  Row,
  Col,
  Card,
  Avatar,
  Space,
  Checkbox,
  Tag,
  Dropdown,
} from "antd";
import clsx from "clsx";

import styles from "./page.module.scss";
export default function SitesPage() {
  return (
    <div className={styles.wrapper}>
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
      <div className={styles.articleListRowWrapper}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div className={styles.articleListRow} key={i}>
            <h4 className={styles.articleListRowTitle}>技术文章</h4>
            <div className={styles.articleList}>
              <Row gutter={[16, 16]} wrap>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <Col key={index} span={4}>
                      {/*<div className={clsx(styles.articleItem)} key={index}>*/}
                      {/*  <div className={styles.articleItemSelectButton}>*/}
                      {/*    <Checkbox />*/}
                      {/*  </div>*/}
                      {/*  <div className={"mb-4 flex items-start"}>*/}
                      {/*    <div className={styles.articleItemLogo}>*/}
                      {/*      <Avatar*/}
                      {/*        size={"large"}*/}
                      {/*        src={"https://api.vvhan.com/api/avatar/recommend"}*/}
                      {/*      />*/}
                      {/*    </div>*/}
                      {/*    <div className={styles.articleItemContent}>*/}
                      {/*      <h6 className={styles.articleItemTitle}>Behance</h6>*/}
                      {/*      <Tooltip*/}
                      {/*        title={*/}
                      {/*          "Adobe旗下的设计师交流平台，来自世界各地的设计师在这里分享自己的行品。"*/}
                      {/*        }*/}
                      {/*      >*/}
                      {/*        <p className={styles.articleItemDescription}>*/}
                      {/*          Adobe旗下的设计师交流平台，来自世界各地的设计师在这里分享自己的行品。*/}
                      {/*        </p>*/}
                      {/*      </Tooltip>*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*  <div className={styles.articleItemTags}>*/}
                      {/*    <Flex gap={"0"}>*/}
                      {/*      <Space wrap={true} size={4}>*/}
                      {/*        <Tag>设计</Tag>*/}
                      {/*        <Tag>UI</Tag>*/}
                      {/*        <Tag>UX</Tag>*/}
                      {/*      </Space>*/}
                      {/*      <span className={styles.articleItemTagAdd}>*/}
                      {/*        <Button type={"text"} size={"small"}>*/}
                      {/*          <AiOutlineTags />*/}
                      {/*        </Button>*/}
                      {/*      </span>*/}
                      {/*    </Flex>*/}
                      {/*  </div>*/}
                      {/*  <div className={styles.articleItemActions}>*/}
                      {/*    <Space size={"small"}></Space>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                      <Card
                        className={styles.articleItem}
                        key={index}
                        cover={
                          <div
                            className={
                              "cover-image overflow-hidden max-h-[200px]"
                            }
                          >
                            <img
                              className={
                                "w-full h-auto hover:scale-110 transition-transform duration-200 ease-in-out"
                              }
                              src={"https://api.vvhan.com/api/wallpaper/views"}
                              alt={"cover"}
                            />
                          </div>
                        }
                      >
                        <Card.Meta
                          title={"独立开发技术栈 2024"}
                          description={
                            "为什么我要将技术的选型仅仅局限在独立开发上呢？因为如果我们不是独立开发，而是替公司或者客户开发的话，个人觉得技术选型的余地不大，乐趣也不高。"
                          }
                        ></Card.Meta>
                        <Space className={"w-full mt-4"} size={8}>
                          <Space size={6}>
                            <Tag color={"blue"}>技术文章</Tag>
                            <Tag color={"purple"}>设计</Tag>
                            <Tag color={"green"}>UI</Tag>
                            <Tag color={"orange"}>UX</Tag>
                          </Space>
                          <Button
                            size={"small"}
                            icon={<AiOutlineTags />}
                          ></Button>
                        </Space>
                      </Card>
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
