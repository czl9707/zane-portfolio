import Link from "next/link";
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import { DateAsString } from "@/lib/utils/date";

import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as Markdown from "@/components/ui/markdown";
import ProjectBlogBrief from "@/components/layout/project-blog-brief";


export default function DevBlogBrief({ blog }: {
    blog: ZaneDevBlog.Info,
}) {
    return (
        <Link href={`/as/developer/blog/${blog.link}`} key={blog.link}>
            <ProjectBlogBrief buttonText="Read More">
                <T.H4>{blog.title}</T.H4>
                <T.Body1 style={{ opacity: 0.75, paddingTop: ".5rem" }}>
                    {DateAsString(blog.createdDate)}
                    {
                        (blog.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        blog.tags?.join(" · ")
                    }
                </T.Body1>
                <Spacer spacing="paragraph" />
                <div style={{ opacity: 0.75 }}>
                    <Markdown.Default>
                        {blog.description}
                    </Markdown.Default>
                </div>
            </ProjectBlogBrief>
        </Link>
    )
}