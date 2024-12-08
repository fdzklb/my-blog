

import * as React from "react";
import { type Metadata } from "next";
import "./styles.css";
import { getSortedBlogsMetaData, getBlogBySlug } from "@/lib/resolveMarkdown";
import ReportViews from "@/components/ReportViews";
import CommentList from "@/components/comment-list/CommentList";
import InputComment from "@/components/comment-list/InputComment";
import { WEBSITE } from "@/constants";

export const revalidate = 60;

export async function generateStaticParams() {
  let posts = await getSortedBlogsMetaData();
  return posts.map((post: { slug: any; }) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> { 
  const { slug } = await props.params;
  const blog = await getBlogBySlug(decodeURI(slug) as string);
  return {
    title: `${blog.title} - ${WEBSITE}`,
    description: blog.description,
  };
}
export default async function Page(props: {
  params: { slug: string; lang: string };
}) {
  const { slug, lang } = await props.params;
  const blog = await getBlogBySlug(decodeURI(slug) as string);
  return (
    <>
      <ReportViews
        slug={blog.title}
        title={blog.title}
        date={blog.date}
        description={blog.description}
        categories={blog.categories}
        suffix={'blog'}
      />
    <div id="m-mdcontent">
      <article>
        <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
      </article>
    {/* <CommentList slug={blog.slug} /> */}
    {/* <InputComment slug={blog.slug} /> */}
    </div>
    </>
  );
}
