import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

import { showErrorToast, showSuccessToast } from "@/components/ui/toast";

dayjs.extend(relativeTime);

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const prettyDateWithWeekday = (date: number | Date) => {
  return dayjs(date).locale("zh-cn").format("dddd，MMMM D YYYY");
};
export const isBrowser = () => {
  // 代码来自：https://ahooks.js.org/zh-CN/guide/blog/ssr
  /* eslint-disable @typescript-eslint/prefer-optional-chain */
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
};



export const fetchUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://leofang.vercel.app/api";