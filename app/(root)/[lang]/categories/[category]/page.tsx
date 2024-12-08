

import * as React from "react";
import { Wrapper } from "@/components/wrapper";
import { getSortedBlogsMetaData, getBlogBySlug } from "@/lib/resolveMarkdown";
import { BlogList } from "@/components/blog/blog-list";

export async function generateStaticParams() {
  let posts = await getSortedBlogsMetaData();
  return posts.map((post: { slug: any; }) => ({
    slug: post.slug,
  }));
}

export default async function Page(props: {
  params: { category: string, lang: string };
}) {
  const { category, lang } = await props.params;
  const blogs = await getSortedBlogsMetaData(decodeURI(category) as string);

  return (
    <Wrapper className="flex min-h-screen flex-col px-6 pb-24 pt-8">
      <h2 className="pb-8 text-3xl font-bold md:text-4xl">{decodeURI(category)}</h2>
      <BlogList blogs={blogs} lang={lang} />
    </Wrapper>
  );
}
