import { Wrapper } from "@/components/wrapper";
import { getSortedPostData } from "@/lib/resolveMarkdown";
import { BlogList } from "@/components/blog/blog-list";


export const revalidate = 60;
export default async function Page() {
  const blogLists = await getSortedPostData();
  
  return (
    <Wrapper className="flex min-h-screen flex-col px-6 pb-24 pt-8">
      <h2 className="pb-8 text-3xl font-bold md:text-4xl">最新文章</h2>
      <BlogList blogs={blogLists} />
    </Wrapper>
  );
}
