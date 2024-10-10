"use client";

import { clsx } from "clsx";
import { AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "#/config/site.config";

import { ThemeModeToggleButton } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { menuList } from "@/menus";

import SearchCommandButton from "./search-command-button";

function HeaderNavList() {
  const pathname = usePathname();

  return (
    <nav className={"flex items-center space-x-4 nav-list"}>
      {menuList.map((item, index) => (
        <Link
          href={item.url}
          key={`nav-link-${index}`}
          className={clsx(
            "px-4 py-2 rounded-full text-center text-sm transition-colors",
            "hover:text-primary hover:bg-muted",
            pathname === item.url ? "bg-muted text-primary font-medium" : null,
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LayoutHeader() {
  return (
    <header className={"app-layout-header"}>
      <div className={"left-container"}>
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
          {siteConfig.title}
        </h1>
      </div>
      <div className={"center-container"}>
        <HeaderNavList />
      </div>
      <div className={"right-container"}>
        <SearchCommandButton />
        <ThemeModeToggleButton />
        <Button variant={"ghost"} size={"icon"}>
          <Link
            href={"https://github.com/zguiyang/smart-toolkit"}
            target={"_blank"}
          >
            <AiOutlineGithub className={"text-xl"} />
          </Link>
        </Button>
        <Button variant={"default"} size={"sm"}>
          Sign In
        </Button>
      </div>
    </header>
  );
}
