import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "Smart Toolbox",
  description: "Smart Personal Toolbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
