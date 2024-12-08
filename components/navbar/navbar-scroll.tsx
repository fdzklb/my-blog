"use client";

import * as React from "react";
import { useScroll, useThrottle } from "ahooks";
import { cn } from "@/lib/utils";

export const NavbarScroll = ({ children }: { children: React.ReactNode }) => {
  const scroll = useScroll(() => document);
  const [previousScrollTop, setPreviousScrollTop] = React.useState(0);
  const throttledPreviousScrollTop = useThrottle(previousScrollTop, {
    wait: 500,
  });

  const [isHideHeader, setIsHideHeader] = React.useState(false);
  const throttledIsHideHeader = useThrottle(isHideHeader, { wait: 500 });

  React.useEffect(() => {
    const _top = scroll?.top ?? 0;

    if (_top - throttledPreviousScrollTop < 0) {
      setIsHideHeader(false);
    } else {
      setIsHideHeader(true);
    }

    if (_top) {
      setPreviousScrollTop(_top);
    }
  }, [scroll?.top]);

  return (
    <header
      className={cn(
        "w-full sticky top-0 backdrop-blur transition-all border-x-0  flex justify-center z-10",
        throttledPreviousScrollTop > 60 &&
          "bg-background/50 border-b border-border/50",
        {
          "-translate-y-20":
            throttledPreviousScrollTop > 300 ? throttledIsHideHeader : false,
        }
      )}
    >
      {children}
    </header>
  );
};