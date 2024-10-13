"use client";
import clsx from "clsx";
import { AutoComplete, Button, Input, Tooltip, Typography } from "antd";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function PageContainer({
  children,
  className,
  style,
}: PageContainerProps) {
  return (
    <div className={clsx("page-container", className)} style={style}>
      <div className={"page-container-header"}>
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
        <Tooltip title={"添加书签"}>
          <Button
            type={"primary"}
            shape={"circle"}
            icon={<AiOutlinePlus />}
          ></Button>
        </Tooltip>
      </div>
      <div className={"page-container-content"}>{children}</div>
    </div>
  );
}
