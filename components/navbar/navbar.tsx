import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { IconBrandGithub } from "../icons";
import { Logo } from "../logo";
import { NextLink } from "../next-link";
import { Button } from "../ui/button";
import { NavbarScroll } from "./navbar-scroll";
import { getDictionary } from '@/app/(root)/dictionaries'
import { SwitchLang } from "./SwitchLang";

// 服务端组件
export const Navbar = async({ lang }: { lang: string }) => {
  const dict = await getDictionary(lang)
  return (
    <NavbarScroll>
      <div className="flex h-16 w-full items-center p-4 sm:p-8 md:max-w-screen-md 2xl:max-w-screen-xl">
        <NextLink
          href={dict.paths.site_home.link}
          className={cn("mr-4 hidden sm:flex")}
          aria-label={dict.info.nickname}
        >
          <Logo />
          <span className="ml-2 text-base font-semibold text-primary">
            {dict.info.nickname}
          </span>
        </NextLink>
        <div className="mr-8 hidden h-16 flex-1 items-center justify-end text-base font-medium sm:flex">
          {Object.values(dict.paths).filter((el: any) => el.show !== false).map((el: any) => (
            <Link
              href={el.link}
              key={el.link}
              className={"font-normal hover:font-semibold hover:text-primary px-4 py-2 text-muted-foreground text-sm transition-colors"}
            >
              <span>
                {el.label}
              </span>
            </Link>
          ))}
          
        </div>
        <MobileNav lang={lang} />
        <div className="hidden sm:block h-6 w-px bg-muted mx-4"></div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
          <Link
            href={dict.info.github_page}
            target="_blank"
            title={dict.info.github_page}
            aria-label={dict.info.github_page}
          >
            <Button variant="outline" size={"icon"} aria-label="Github Icon">
              <IconBrandGithub className="text-base" />
            </Button>
          </Link>
          <SwitchLang />
        </div>
      </div>
    </NavbarScroll>
  );
};