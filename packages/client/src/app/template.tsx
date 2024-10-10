import { DefaultLayout } from "@/components/layouts/default-layout";
export default function Template({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
