"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";

// 切换语言
export function SwitchLang() {
  const router = useRouter();

  const switchLanguage = () => {
    const currentPath = window.location.pathname;
    const currentLang = currentPath.split("/")[1];
    const newLang = currentLang === "en" ? "zh" : "en";
    const newPathname = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          aria-label="Language"
          onClick={switchLanguage}
        >
          <Languages className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>switch language</TooltipContent>
    </Tooltip>
  );
}
