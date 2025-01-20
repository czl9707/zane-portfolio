import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";

import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import Link from "next/link";
import React from "react";

export const HEIGHT_CLASS = "min-h-28";

export default function DevProjectCard({ project }: { project: ZaneDevProject.Info }) {
    return (
        <Link href={project.externalLink}>
            <SlideUp.Div className={`group/blogcard pt-12 flex flex-col ${HEIGHT_CLASS}`}>
                <div className="flex flex-row items-end">
                    <T.H4 className="mb-2">{project.title}</T.H4>

                    <div className="flex-1" />

                    <T.Body1 className="group-hover/blogcard:text-foreground text-foreground/75 transition-colors duration-500">
                        Take Me There
                        <span className="w-1 group-hover/blogcard:w-4 inline-block transition-[width] duration-500" />
                        {">>"}
                        <span className="w-4 group-hover/blogcard:w-1 inline-block transition-[width] duration-500" />
                    </T.Body1>
                </div>

                <T.Body1 className="text-foreground/75">
                    {project.startDate.toLocaleString('US', { month: 'long', day: "2-digit", year: "numeric" })}
                    {
                        (project.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        project.tags?.join(" · ")
                    }
                </T.Body1>

                <T.Body1 className="text-foreground/75 pt-6">
                    {project.description}
                </T.Body1>

                <div className="flex-1" />

                <Divider className="group-hover/blogcard:bg-foreground transition-colors duration-500 mt-12" />
            </SlideUp.Div >
        </Link>
    )
}
