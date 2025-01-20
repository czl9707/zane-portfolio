import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";

import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";

import Link from "next/link";
import React from "react";

export const HEIGHT_CLASS = "min-h-24";

export default function BlogCard({ blog }: { blog: ZaneDevBlog.Info }) {
    return (
        <Link href={`/as/developer/blog/${blog.title.replace(" ", "_")}`}>
            <SlideUp.Div className={`group/blogcard pt-12 flex flex-col ${HEIGHT_CLASS}`}>
                <T.H4 className="mb-2">{blog.title}</T.H4>

                <div className="flex flex-row">
                    <T.Body1 className="text-foreground/75">
                        {blog.createdDate.toLocaleString('US', { month: 'long', day: "2-digit", year: "numeric" })}
                        {
                            (blog.tags?.length ?? 0) > 0 ? " · " : ""
                        }
                        {
                            blog.tags?.join(" · ")
                        }
                    </T.Body1>

                    <div className="flex-1" />

                    <T.Body1 className="group-hover/blogcard:text-foreground text-foreground/75 transition-colors duration-500">
                        Read More
                        <span className="w-1 group-hover/blogcard:w-4 inline-block transition-[width] duration-500" />
                        {">>"}
                        <span className="w-4 group-hover/blogcard:w-1 inline-block transition-[width] duration-500" />
                    </T.Body1>
                </div>
                <div className="flex-1" />
                <Divider className="group-hover/blogcard:bg-foreground transition-colors duration-500 mt-12" />
            </SlideUp.Div >
        </Link>
    )
}