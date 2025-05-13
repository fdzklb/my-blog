import { Wrapper } from "@/components/wrapper";
import { getSortedBlogsMetaData } from "@/lib/resolveMarkdown";
import { BlogList } from "@/components/blog/blog-list";
import { getDictionary } from "@/app/(root)/dictionaries";
import Link from "next/link";

export const revalidate = 60;
export default async function Page({
  params,
}: {
  params: { lang: "en" | "zh" };
}) {
  const { lang } = await params;
  // 目前无英文博客
  const blogLists = lang === "zh" ? getSortedBlogsMetaData() : [];
  const dict = lang === "zh" ? await getDictionary(lang) : {};

  return (
    <Wrapper className="flex flex-col px-6 pb-24 pt-8">
      <div className="flex justify-between">
        <h2 className="pb-8 text-3xl font-bold md:text-4xl">
          {lang === "zh" ? "最新文章" : "Latest Articles"}
        </h2>
        <div className="flex">
          {dict?.categories
            ? Object.values(dict.categories).map((item: any) => (
                <div key={item.href} className="ml-4 flex items-center">
                  <Link href={item.href}>
                    <div
                      className={`flex items-center px-2 py-2 rounded-sm font-semibold text-xs/[6px]
                      text-center text-white shadow-sm ${item.color}`}
                    >
                      <span>{item.href.match(/\/([^\/]+)$/)?.[1]}</span>
                    </div>
                  </Link>
                </div>
              ))
            : null}
        </div>
      </div>
      <BlogList blogs={blogLists} lang={lang} />
    </Wrapper>
  );
}
