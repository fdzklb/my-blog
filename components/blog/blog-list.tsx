import { IllustrationNoContent } from "@/components/illustrations";

import { BlogListItem } from "./blog-list-item";


export type BlogType = {
  bgImgPath: string;
  title: string;
  description: string;
  id: string;
  tags: string[];
  date: string;
}

type BlogListProps = {
  blogs: BlogType[];
};

export const BlogList = ({ blogs }: BlogListProps) => {
  if (!blogs.length) {
    return (
      <div className="grid place-content-center gap-8">
        <IllustrationNoContent className="size-[30vh]" />
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          暂无Blog
        </h3>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
      {blogs.map((el, idx) => (
        <li
          key={el.id}
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${(idx + 1) * 200}ms`,
          }}
        >
          <BlogListItem blog={el} />
        </li>
      ))}
    </ul>
  );
};
