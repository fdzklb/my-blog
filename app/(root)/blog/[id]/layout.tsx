import * as React from "react";
import { type Metadata } from "next";
import { WEBSITE } from "@/constants";
import { getPostById } from "@/lib/resolveMarkdown";


export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const blog  = await getPostById(decodeURI(params.id) as string);
  return {
    title: `${blog.title} - ${WEBSITE}`,
    description: blog.description,
  };
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

