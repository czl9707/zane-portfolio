import Link from "next/link";
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import { DateAsString } from "@/lib/utils/date";

import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as StyledMarkdown from "@/components/ui/styled-markdown";
import ProjectBlogBriefSession from "@/components/layout/project-blog-brief-session";


export default function DevBlogCard({ blog }: {
    blog: ZaneDevBlog.Info,
}) {
    return (
        <Link href={`/as/developer/blog/${blog.title.replaceAll(" ", "_")}`} key={blog.title}>
            <ProjectBlogBriefSession buttonText="Read More">
                <T.H4>{blog.title}</T.H4>
                <T.Body1 style={{ opacity: 0.75 }}>
                    {DateAsString(blog.createdDate)}
                    {
                        (blog.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        blog.tags?.join(" · ")
                    }
                </T.Body1>
                <Spacer spacing="component" />
                <div style={{ opacity: 0.75 }}>
                    <StyledMarkdown.Default>
                        {blog.description}
                    </StyledMarkdown.Default>
                </div>
            </ProjectBlogBriefSession>
        </Link>
    )
}