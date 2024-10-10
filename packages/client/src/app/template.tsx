import { LayoutHeader } from "@/layouts/layout-header";
import { LayoutMain } from "@/layouts/layout-main";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className={"default-layout-wrapper"}>
      <LayoutHeader />
      <div className={"default-layout-container"}>
        <LayoutMain>{children}</LayoutMain>
      </div>
    </div>
  );
}
