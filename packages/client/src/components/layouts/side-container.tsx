import clsx from "clsx";

export interface SideContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SideContainer({
  children,
  className,
  style,
}: SideContainerProps) {
  return (
    <aside
      className={clsx(
        "w-[256px] border-r border-gray-200 bg-white flex flex-col p-4",
        "side-container",
        className,
      )}
      style={style}
    >
      {children}
    </aside>
  );
}
