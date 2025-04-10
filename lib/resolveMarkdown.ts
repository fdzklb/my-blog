/**
 * 解析md mdx文件
 */
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
// import dayjs from "dayjs";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeStringify from "rehype-stringify";
// import rehypePrettyCode from "rehype-pretty-code";

const blogs = {
  blogsDir: "blogLists",
};

type Metadata = {
  title: string;
  date: string;
  tags: string;
  description: string;
  categories: string;
  bgImgPath: string;
}

type Post = {
  slug: string;
  metadata: Metadata;
  content: string;
}

/**
 * 获取文章meta数据
 * @param category // 根据分类获取文章
 * @param blogsDir // 根据目录获取文章
 * @returns 文章meta数据
 */
export const getSortedBlogsMetaData = (category = '', blogsDir = blogs.blogsDir) => {
  const blogsDirectory = path.join(process.cwd(), blogsDir);
  let allblogsData = fs.readdirSync(blogsDirectory).filter((file) => path.extname(file) === '.mdx')
    .map((name) => {
      // 去除文件名的md,mdx后缀，使文件名作为文章id使用
      const slug = name.replace(/\.(mdx|md)$/, "");
      const { metadata } = readMdFile(slug, blogsDir);
      return { ...metadata, slug };
    });
  
  // 如果传入了分类，则只返回该分类下的文章
  if(category) {
    allblogsData = allblogsData.filter((blog) => blog?.categories.split(',')?.includes(category));
  }
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
        slug: name.replace(".mdx", ""),
      },
    }));
};

export const getBlogBySlug = (slug: string, blogsDir = blogs.blogsDir) : Post => {
  return readMdFile(slug, blogsDir);
}
// 解析mdx文件
function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}


const readMdFile = (name = '', blogsDir = blogs.blogsDir) => {
  const mdFile = fs.readFileSync(path.join(process.cwd(), blogsDir, `${name}.mdx`), {
    encoding: "utf-8",
  });
  return { ... parseFrontmatter(mdFile), slug: name } as Post;
}
