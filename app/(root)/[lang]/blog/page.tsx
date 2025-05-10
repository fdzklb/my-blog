import { Wrapper } from "@/components/wrapper";
import { getSortedBlogsMetaData } from "@/lib/resolveMarkdown";
import { BlogList } from "@/components/blog/blog-list";

export const revalidate = 60;
export default async function Page({ params }: { params: { lang: 'en' | 'zh' } }) {

  const { lang } = await params
  // 目前无英文博客
  const blogLists = lang === 'zh' ? getSortedBlogsMetaData() : []
  
  return (
    <Wrapper className="flex flex-col px-6 pb-24 pt-8">
      <h2 className="pb-8 text-3xl font-bold md:text-4xl">{lang === 'zh' ? '最新文章' : 'Latest Articles'}</h2>
      <BlogList blogs={blogLists} lang={lang} />
    </Wrapper>
  );
}
