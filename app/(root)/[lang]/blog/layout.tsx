import * as React from "react";
import { getDictionary } from "@/app/(root)/dictionaries";


export async function generateMetadata({ params }: { params: { lang: 'zh' | 'en' } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.paths.site_blog.label,
    description: dict.paths.site_blog.description,
  };
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
