import * as React from "react";

import { cn } from "@/lib/utils";

export const IconBrandTwitter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn("icon-[fa6-brands--twitter]", className)}
    ></span>
  );
};
