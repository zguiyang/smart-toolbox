"use client";

import { Modal, Form, Input, Select } from "antd";
interface AddEditSiteModalProps {
  title: string;
  visible: boolean;
  isEdit: boolean;
  initialValues?: Record<string, any>;
  onOk?: (values: any) => void;
  onCancel?: () => void;
}

export default function AddEditSiteModal({
  title,
  visible,
}: AddEditSiteModalProps) {
  return (
    <>
      <Modal title={title} open={visible} width={460}>
        <Form layout={"vertical"} size={"middle"}>
          <Form.Item label={"地址"}>
            <Input placeholder={"请输入书签地址"}></Input>
          </Form.Item>
          <Form.Item label={"名称"}>
            <Input placeholder={"请输入书签名称，可由AI自动抓取"}></Input>
          </Form.Item>
          <Form.Item label={"描述"}>
            <Input placeholder={"请输入书签名称，可由AI自动生成"}></Input>
          </Form.Item>
          <Form.Item label={"标签"}>
            <Select mode={"tags"} placeholder={"请选择标签"}></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
