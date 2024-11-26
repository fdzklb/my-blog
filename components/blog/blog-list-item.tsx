import * as React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { BlogType } from "./blog-list";
import { PATHS } from "@/constants";


type BlogListItemProps = {
  blog: BlogType;
};

const tagColor = {
  科技: "bg-cyan-500",
  经济: "bg-fuchsia-500",
  JavaScript: "bg-indigo-500",
  旅行: "bg-[#75d1fa]",
  思考: "bg-[#9273f9]",
  前端: "bg-[#757c72]",
  新闻: "bg-[#50d71e]",
  生活: "bg-[#fcc31f]",
};

export const BlogListItem = ({ blog }: BlogListItemProps) => {
  return (
    <Link
      href={`${PATHS.SITE_BLOG}/${blog.id}`}
      className="group"
      target="_blank"
    >
      <div className="relative rounded-sm transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200">
        <Image
          src={blog.bgImgPath}
          alt={"博客背景图片"}
          width={700}
          height={400}
          className="aspect-video object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
        />
      </div>
      <div className="flex flex-col mt-3 space-y-2 leading-2">
        <h2 className="text-slate-900 font-semibold group-hover:text-sky-500">
          {blog.title}
        </h2>
        <p className="w-full flex-none text-[0.8125rem] text-slate-500">
          {blog.description}
        </p>
        <div className="flex justify-between align-middle text-sm text-slate-500">
          <div className="space-x-2 flex">
            {blog.tags.map((tagName: string) => (
              <div
                key={tagName}
                className={`flex items-center px-2 py-1 rounded-sm font-semibold text-xs/[6px] text-center text-white shadow-sm ${tagColor[tagName]}`}
              >
                <span>{tagName}</span>
              </div>
            ))}
          </div>
          <div className="flex h-5 items-center space-x-1">
            <Calendar className="size-3" />
            <time className="text-[0.85rem]">{blog.date}</time>
          </div>
        </div>
      </div>
    </Link>
  );
};
