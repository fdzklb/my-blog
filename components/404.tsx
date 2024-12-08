"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IllustrationNotFound } from "@/components/illustrations";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    } else {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="grid place-content-center h-screen">
      <div className="grid gap-8">
        <IllustrationNotFound className="size-[320px]" />
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          404 - Page Not Found
        </h3>
        <Button>
          <div
            className="w-full flex justify-center items-center"
            onClick={() => router.push("/")}
          >
            <span>Go Home</span>
            <span className="text-lg font-bold ml-2 text-red-500">
              {" "}
              {countdown}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}

// "site_portfolio": {
//   "link": "/zh/portfolio",
//   "label": "作品集",
//   "description": "记录我了我这些年工作中开发(使用到)的一些小东西～"
// },
// "site_blog": {
//   "link": "/zh/blog",
//   "label": "博客",
//   "description": "这里记录了我的想法、文章，希望和大家一起交流～"
// },
// "site_category": {
//   "link": "/zh/categories",
//   "label": "博客分类",
//   "description": "多是一些零零碎碎的片段，通常是代码片段"
// },
// "site_about": {
//   "link": "/zh/about",
//   "label": "关于",
//   "description": "叮～ 你有一份关于${nickname}的简介，请查收～"
// }
