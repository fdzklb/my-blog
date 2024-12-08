import * as React from "react";
import { ImageAssets } from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { getDictionary } from '@/app/(root)/dictionaries'

type Props = {
  className?: string;
};

export const Logo = async ({ className }: Props) => {
  return (
    <>
      <Image
        src={ImageAssets.logoDark}
        alt="Logo"
        width={32}
        height={32}
        className={cn("w-8 h-8", className)}
        // 添加这个属性可以优化加载
        priority={true}
      />
    </>
  );
};
