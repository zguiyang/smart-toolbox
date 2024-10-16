"use client";

import { Form, Input, Button, Space, Typography, Divider } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div
      className={
        "relative w-screen h-screen overflow-hidden bg-gray-50 flex justify-center items-center"
      }
    >
      <div
        className={
          "w-[480px] bg-white rounded-lg shadow-lg px-8 py-12 flex flex-col"
        }
      >
        <h2 className={"text-xl font-medium text-gray-900 text-center"}>
          注册你的账号
        </h2>
        <div className={"mt-4"}>
          <Form size={"large"}>
            <Form.Item>
              <Input placeholder={"邮箱"} variant={"filled"}></Input>
            </Form.Item>
            <Form.Item>
              <Input
                placeholder={"验证码"}
                suffix={<Button type={"link"}>获取验证码</Button>}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Space direction={"vertical"} className={"w-full"} size={4}>
                <Input.Password
                  placeholder={"密码"}
                  variant={"filled"}
                ></Input.Password>
              </Space>
            </Form.Item>
            <Form.Item>
              <Space direction={"vertical"} className={"w-full"} size={4}>
                <Input.Password
                  placeholder={"确认密码"}
                  variant={"filled"}
                ></Input.Password>
              </Space>
            </Form.Item>
            <Form.Item>
              <Space
                direction={"vertical"}
                size={8}
                className={"w-full text-center"}
              >
                <Button type={"primary"} block>
                  注册
                </Button>
                <span className={"text-xs text-gray-800"}>
                  已有账号？
                  <Typography.Link href={"/sign-in"}>去登录</Typography.Link>
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
