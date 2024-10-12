import { DefaultLayout } from "@/components/layouts/default-layout";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
