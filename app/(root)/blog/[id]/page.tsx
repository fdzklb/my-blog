
import { getPostById } from "@/lib/resolveMarkdown";
import "./styles.css";

export const revalidate = 60;
export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const blog  = await getPostById(decodeURI(props.params.id) as string);

  return (
    <div id="m-mdcontent">
      {/* <h1 style={{ fontSize: 18 }}>asdasdsadsa</h1> */}
      {/* <title style={{ fontSize: 18 }}>{data.title}</title> */}
      {/* <article className="content"> */}
      <article>
        <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
      </article>
    </div>
  );
}
