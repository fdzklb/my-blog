import * as React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { BlogType } from "./blog-list";
import { getDictionary } from "@/app/(root)/dictionaries";

type BlogListItemProps = {
  lang: 'en' | 'zh',
  blog: BlogType;
};

export const BlogListItem = async ({ lang, blog }: BlogListItemProps) => {
  const dict = await getDictionary(lang)
  const categories = blog.categories?.split(",") || [];

  return (
    <div className="bg-slate-50 p-3 rounded-sm shadow-md">
      <Link href={`${dict.paths.site_blog.link}/${blog.slug}`} target="_blank" className="group">
        <div className="relative rounded-sm transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200">
          <Image
            src={blog.bgImgPath}
            alt={"博客背景图片"}
            width={700}
            height={400}
            className="aspect-video object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
          />
        </div>
        <div className="flex flex-col my-2 space-y-2">
          <h2 className="text-slate-900 font-semibold group-hover:text-sky-500">
            {blog.title}
          </h2>
          <p className="w-full flex-none text-[0.8125rem] text-slate-500">
            {blog.description}
          </p>
        </div>
        <div className="flex justify-between align-middle text-sm text-slate-500">
          <div className="space-x-2 flex">
            {categories.map((name: string) => (
              <object key={name}>
                <Link href={`${dict.paths.site_category.link}/${name}`} key={name}>
                  <div
                    className={`flex items-center px-2 py-2 rounded-sm font-semibold text-xs/[6px]
                      text-center text-white shadow-sm ${dict.categories[name]["color"]}`}
                  >
                    <span>{name}</span>
                  </div>
                </Link>
              </object>
            ))}
          </div>
          <div className="flex h-5 items-center space-x-1">
            <Calendar className="size-3" />
            <time className="text-[0.85rem]">{blog.date}</time>
          </div>
        </div>
      </Link>
    </div>
  );
};
