import * as React from "react";
import { type Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";
import "./styles.css";
import { getSortedBlogsMetaData, getBlogBySlug } from "@/lib/resolveMarkdown";
import { CustomMDX } from "@/components/blog/mdxContent";
import ReportViews from "@/components/ReportViews";
import CommentList from "@/components/comment-list/CommentList";
import InputComment from "@/components/comment-list/InputComment";
import { WEBSITE } from "@/constants";

export const revalidate = 60;

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
  const blog = await getBlogBySlug(decodeURI(slug) as string);
  const mdxSource = await serialize(blog.content, { parseFrontmatter: true })
  console.log(mdxSource);
  return (
    <>
      {/* <ReportViews
        slug={blog.title}
        title={blog.title}
        date={blog.date}
        description={blog.description}
        categories={blog.categories}
        suffix={'blog'}
      /> */}
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
      <div id="m-mdcontent">
          <h1 className="title font-semibold text-2xl tracking-tighter">
            {blog.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-8 text-sm">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {blog.metadata.date}
            </p>
          </div>
        <article>
          <CustomMDX
            // source={mdxSource}
            source={blog.content}
          />
        </article>
        {/* <CommentList slug={blog.slug} /> */}
        {/* <InputComment slug={blog.slug} /> */}
      </div>
    </>
  );
}
