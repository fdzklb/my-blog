import * as React from "react";
import { type Metadata } from "next";
import "./styles.css";
import { getDictionary } from "@/app/(root)/dictionaries";
import Link from "next/link";
import { getSortedBlogsMetaData, getBlogBySlug } from "@/lib/resolveMarkdown";
import { CustomMDX } from "@/components/blog/mdxContent";
import ReportViews from "@/components/ReportViews";
import dayjs from 'dayjs';
// import CommentList from "@/components/comment-list/CommentList";
// import InputComment from "@/components/comment-list/InputComment";
import Anchor from "@/components/ui/anchor";
import { WEBSITE } from "@/lib/constants";
import { getBlogViewCountBySlug } from "@/db/actions/blog";
import { Eye } from 'lucide-react'

export const revalidate = 3600;

const weekMap = {
  0: '星期一',
  1: '星期二',
  2: '星期三', 
  3: '星期四',
  4: '星期五',
  5: '星期六',
  6: '星期日'
}

export async function generateStaticParams() {
  let posts = await getSortedBlogsMetaData();
  return posts.map((blog: { slug: any }) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(decodeURI(slug) as string);
  const title = `${blog.metadata.title} - ${WEBSITE}`;
  const description = blog.metadata.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.metadata.date,
      // url: `${baseUrl}/blog/${blog.slug}`,
      // images: [
      //   {
      //     url: ogImage,
      //   },
      // ],
    },
  };
}
export default async function Page(props: {
  params: { slug: string; lang: string };
}) {
  const { slug, lang } = await props.params;
  const dict = await getDictionary(lang)
  const blog = await getBlogBySlug(decodeURI(slug) as string);
  const categories = blog.metadata.categories.split(';')
  const view_count = getBlogViewCountBySlug(decodeURI(slug) as string);
  return (
    <>
      <ReportViews
        slug={blog.metadata.title}
        title={blog.metadata.title}
        date={blog.metadata.date}
        description={blog.metadata.description}
        categories={blog.metadata.categories}
        suffix={"blog"}
      />
      {/* <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.metadata.title,
            datePublished: blog.metadata.date,
            description: blog.metadata.description,
            // image: blog.metadata.image
            //   ? `${baseUrl}${blog.metadata.image}`
            //   : `/og?title=${encodeURIComponent(blog.metadata.title)}`,
            url: `${lang}/blog/${blog.slug}`,
            // author: {
            //   '@type': 'Person',
            //   name: 'My Portfolio',
            // },
          }),
        }}
      /> */}

      <div id="m-mdcontent" className="pr-[20%] xl:pr-[30%]">
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {blog.metadata.title}
        </h1>
        <div className="flex space-x-4 items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {blog.metadata.date}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {weekMap[dayjs(blog.metadata.date).day()]}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <Eye className="inline-block mr-1" />
            <span>{view_count || 1 }</span>
          </p>
          {categories.map((name: string) => (
              <object key={name}>
                <Link href={`${dict.paths.site_category.link}/${name}`} key={name}>
                  <div
                    className={`flex items-center px-2 py-2 rounded-sm font-semibold text-xs/[6px]
                      text-center text-white shadow-sm ${dict.categories[name]["color"]}`}
                  >
                    <span>{name.trim()}</span>
                  </div>
                </Link>
              </object>
            ))}
        </div>
        <article>
          <CustomMDX
            source={blog.content}
          />
        </article>
        {/* <CommentList slug={blog.slug} /> */}
        {/* <InputComment slug={blog.slug} /> */}
      </div>
      <div className="hidden text-sm xl:block fixed right-3 top-[12%]">
        <div className="xl:w-[380px] 2xl:w-[450px]">
          <Anchor />
        </div>
      </div>
    </>
  );
}
