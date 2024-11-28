

import * as React from "react";
import { type Metadata } from "next";
import { WEBSITE } from "@/constants";
import "./styles.css";
import { getSortedBlogsMetaData, getBlogBySlug } from "@/lib/resolveMarkdown";
import ReportViews from "@/components/ReportViews";
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
  const params = await props.params;
  const blog = await getBlogBySlug(decodeURI(params.slug) as string);
  return {
    title: `${blog.title} - ${WEBSITE}`,
    description: blog.description,
  };
}
export default async function Page(props: {
  params: { slug: string };
}) {
  const params = await props.params;
  const blog = await getBlogBySlug(decodeURI(params.slug) as string);

  return (
    <>
      <ReportViews
        slug={blog.title}
        title={blog.title}
        date={blog.date}
        description={blog.description}
        tags={blog.tags}
        suffix={'blog'}
      />
    <div id="m-mdcontent">
      <article>
        <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
      </article>
    </div>
    </>
  );
}
