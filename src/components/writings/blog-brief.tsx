import Link from "next/link";
import * as ZaneBlog from "@/lib/cms/zane-blog";
import { DateAsString } from "@/lib/utils/date";

import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as Markdown from "@/components/ui/markdown";
import ContentBrief from "@/components/layout/content-brief";


export default function BlogBrief({ blog, withDescription = false }: {
    blog: ZaneBlog.Info,
    withDescription?: boolean,
}) {
    return (
        <Link href={`/blog/by/developer/${blog.id}`} key={blog.id}>
            <ContentBrief buttonText="Read More">
                {
                    withDescription ? 
                        <T.H5>{blog.title}</T.H5> :
                        <T.H6>{blog.title}</T.H6>
                }
                <T.Body1 style={{ opacity: 0.75, paddingTop: ".5rem" }}>
                    {DateAsString(blog.createdDate)}
                    {
                        (blog.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        blog.tags?.join(" · ")
                    }
                </T.Body1>
                {
                    withDescription && <>
                    <Spacer spacing="paragraph" />
                    <div style={{ opacity: 0.75 }}>
                        <Markdown.Default>
                            {blog.description}
                        </Markdown.Default>
                    </div>
                    </>
                }
            </ContentBrief>
        </Link>
    )
}

BlogBrief.Container = ContentBrief.Container;