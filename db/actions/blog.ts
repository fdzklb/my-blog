'only server' 

import { db } from "@/db";
export const getBlogViewCountBySlug = async (slug: string) => {
    try {
        const blog = await db.blog.findUnique({where: { slug }});
        const { view_count } = blog || { view_count: '1' };
        return view_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (error) {
        console.error("Database Error...", error);
        throw new Error(`Failed to fetch the ${slug} posts`);
    }
  };