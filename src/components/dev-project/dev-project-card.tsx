import Link from "next/link";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";
import { MonthAsString } from "@/lib/utils/date";

import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as StyledMarkdown from "@/components/ui/markdown";
import ProjectBlogBrief from "@/components/layout/project-blog-brief";


export default function DevProjectBrief({ project }: {
    project: ZaneDevProject.Info
}) {
    return (
        <Link href={project.externalLink}>
            <ProjectBlogBrief buttonText="Take me there">
                <T.H4>{project.title}</T.H4>

                <T.Body1 style={{ opacity: 0.75, paddingTop: ".5rem" }}>
                    {MonthAsString(project.startDate)}
                    {
                        (project.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        project.tags?.join(" · ")
                    }
                </T.Body1>

                <Spacer spacing="component" />
                <div style={{ opacity: 0.75 }}>
                    <StyledMarkdown.Default>
                        {project.description}
                    </StyledMarkdown.Default>
                </div>
            </ProjectBlogBrief>
        </Link>
    )
}