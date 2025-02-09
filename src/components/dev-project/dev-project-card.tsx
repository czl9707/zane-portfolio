import Link from "next/link";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";
import { MonthAsString } from "@/lib/utils/date";

import * as T from "@/components/ui/typography";
import * as StyledMarkdown from "@/components/ui/styled-markdown";
import ProjectBlogBriefSession from "@/components/layout/project-blog-brief-session";


export default function DevProjectCard({ project }: {
    project: ZaneDevProject.Info
}) {
    return (
        <Link href={project.externalLink}>
            <ProjectBlogBriefSession buttonText="Take me there">
                <T.H4 className={`transition-color duration-500`}>{project.title}</T.H4>

                <T.Body1 className="text-foreground/75">
                    {MonthAsString(project.startDate)}
                    {
                        (project.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        project.tags?.join(" · ")
                    }
                </T.Body1>

                <div className="text-foreground/75 pt-6">
                    <StyledMarkdown.Default>
                        {project.description}
                    </StyledMarkdown.Default>
                </div>
            </ProjectBlogBriefSession>
        </Link>
    )
}