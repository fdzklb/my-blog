import * as React from "react";
import { type Metadata } from "next";
import { WEBSITE } from "@/constants";
import { getSortedBlogsMetaData, getBlogBySlug } from "@/lib/resolveMarkdown";

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

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

