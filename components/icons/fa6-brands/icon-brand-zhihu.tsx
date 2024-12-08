import * as React from "react";

import { cn } from "@/lib/utils";

export const IconBrandZhihu = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn("icon-[fa6-brands--zhihu]", className)}
    ></span>
  );
};
