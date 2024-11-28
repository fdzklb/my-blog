/**
 * 解析md mdx文件
 */
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dayjs from "dayjs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const blogs = {
  blogsDir: "blogLists",
};

// 获取排序后的所有文章数据的metaData
export const getSortedBlogsMetaData = async (blogsDir = blogs.blogsDir) => {
  const blogsDirectory = path.join(process.cwd(), blogsDir);
  const blogNames = await fsPromises.readdir(blogsDirectory);
  const allblogsData = blogNames
    .filter((name) => name !== ".DS_Store") // mac电脑会出现.DS_Store, remove /DS_Store
    .map((name) => {
      // 去除文件名的md后缀，使文件名作为文章id使用
      const slug = name.replace(".md", "");
      const mdContent = fs.readFileSync(path.join(blogsDirectory, name), {
        encoding: "utf-8",
      });
      // use gray-matter to parse the blog metadata section
      const matterData = matter(mdContent);
      const { date, bgImgPath, title, description, tags } = matterData.data;
      return {
        slug,
        date,
        bgImgPath,
        title,
        description,
        tags,
      };
    });
  // 按照日期从近到远排序
  return allblogsData.sort(({ date: a }, { date: b }) => {
    const timeA = new Date(a);
    const timeB = new Date(b);
    return timeB.getTime() - timeA.getTime();
  });
};


// 获取所有文章id
export const getAllSlug = async (blogsDir = blogs.blogsDir) => {
  const blogPath = path.join(process.cwd(), blogsDir);
  const blogNames = await fsPromises.readdir(blogPath);
  return blogNames
    .filter((name) => name != ".DS_Store")
    .map((name) => ({
      params: {
        slug: name.replace(".md", ""),
      },
    }));
};

// 通过文章id获取文章内容
export const getBlogBySlug = async (slug: string, blogsDir = blogs.blogsDir) => {
  const blogPath = path.join(process.cwd(), blogsDir, `${slug}.md`);
  const mdContent = await fsPromises.readFile(path.join(blogPath), {
    encoding: "utf-8",
  });
  // 使用matter解析markdown元数据和内容
  const matterData = matter(mdContent);
  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(matterData.content);
  return {
    slug,
    date: matterData.data.date,
    title: matterData.data.title,
    tags: matterData.data.tags,
    htmlContent: content.value,
    description: matterData.data.description,
  };
};
