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

export const getSortedPostData = async () => {
  const postsDirectory = path.join(process.cwd(), "blogLists");
  const postNames = await fsPromises.readdir(postsDirectory);
  const allPostsData = postNames
    .filter((name) => name !== ".DS_Store") // mac电脑会出现.DS_Store, remove /DS_Store
    .map((name) => {
      // 去除文件名的md后缀，使其作为文章id使用
      const id = name.replace(".md", "");
      const mdContent = fs.readFileSync(path.join(postsDirectory, name), {
        encoding: "utf-8",
      });
      // use gray-matter to parse the post metadata section
      const matterData = matter(mdContent);
      return {
        id,
        ...matterData.data,
        date: matterData.data.date,
      };
    });
  // 按照日期从近到远排序
  return allPostsData.sort(({ date: a }, { date: b }) => {
    const timeA = new Date(a);
    const timeB = new Date(b);
    return timeB.getTime() - timeA.getTime();
  });
};

// 获取格式化后的所有文章id（文件名）
export const getAllIds = async () => {
  const postPath = path.join(process.cwd(), "blogLists");
  const postNames = await fsPromises.readdir(postPath);
  return postNames
    .filter((name) => name != ".DS_Store")
    .map((name) => ({
      params: {
        id: name.replace(".md", ""),
      },
    }));
};

// 通过文章id获取文章内容
export const getPostById = async (id: string) => {
  const postPath = path.join(process.cwd(), "blogLists", `${id}.md`);
  const mdContent = await fsPromises.readFile(path.join(postPath), {
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
  const htmlContent = content.value;
  return {
    id,
    date: dayjs(matterData.data.date, "LLLL d, yyyy"),
    title: matterData.data.title,
    htmlContent,
  };
};
