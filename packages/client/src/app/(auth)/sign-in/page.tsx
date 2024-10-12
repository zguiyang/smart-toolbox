"use client";

import { Form, Input, Button, Space, Typography, Divider } from "antd";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div
      className={
        "relative w-screen h-screen overflow-hidden bg-gray-50 flex justify-center items-center"
      }
    >
      <div
        className={
          "w-[480px] bg-white rounded-2xl shadow-lg px-8 py-12 flex flex-col"
        }
      >
        <h2 className={"text-xl font-medium text-gray-900 text-center"}>
          登录你的账号
        </h2>
        <div className={"mt-4"}>
          <Form size={"large"}>
            <Form.Item>
              <Input
                placeholder={"邮箱"}
                prefix={<MdOutlineEmail />}
                variant={"outlined"}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Space direction={"vertical"} className={"w-full"} size={4}>
                <Input.Password
                  placeholder={"密码"}
                  prefix={<MdLockOutline />}
                  variant={"outlined"}
                ></Input.Password>
                <Button type={"link"} size={"small"}>
                  忘记密码？
                </Button>
              </Space>
            </Form.Item>
            <Form.Item>
              <Space
                direction={"vertical"}
                size={8}
                className={"w-full text-center"}
              >
                <Button type={"primary"} block>
                  登录
                </Button>
                <span className={"text-xs text-gray-800"}>
                  还没有账号？
                  <Typography.Link href={"/register"}>去注册</Typography.Link>
                </span>
              </Space>
            </Form.Item>
            <Divider plain>或</Divider>
            <Space direction={"vertical"} size={12} className={"w-full"}>
              <button
                className={
                  "flex items-center justify-center text-center border-2 border-gray-300 rounded-md p-2 font-medium text-gray-800 w-full"
                }
              >
                <span>
                  <FcGoogle size={24} />
                </span>
                <span
                  className={"flex flex-1 justify-center -ms-6 tracking-widest"}
                >
                  通过Google继续
                </span>
              </button>
              <button
                className={
                  "flex items-center justify-center text-center border-2 border-gray-300 rounded-md p-2 font-medium text-gray-800 w-full"
                }
              >
                <span>
                  <FaGithub size={24} />
                </span>
                <span
                  className={"flex flex-1 justify-center -ms-6 tracking-widest"}
                >
                  通过Github继续
                </span>
              </button>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  );
}
