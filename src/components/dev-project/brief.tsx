import Link from "next/link";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";
import { MonthAsString } from "@/lib/utils/date";

import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as StyledMarkdown from "@/components/ui/markdown";
import ContentBrief from "@/components/layout/content-brief";


export default function DevProjectBrief({ project, withDescription = false }: {
    project: ZaneDevProject.Info
    withDescription?: boolean
}) {
    return (
        <Link href={project.externalLink}>
            <ContentBrief buttonText="Take me there">
                {
                    withDescription ? 
                        <T.H5>{project.title}</T.H5> :
                        <T.H6>{project.title}</T.H6>
                }
                <T.Body1 style={{ opacity: 0.75, paddingTop: ".5rem" }}>
                    {MonthAsString(project.startDate)}
                    {
                        (project.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                        project.tags?.join(" · ")
                    }
                </T.Body1>
                {
                    withDescription && <>
                        <Spacer spacing="component" />
                        <div style={{ opacity: 0.75 }}>
                            <StyledMarkdown.Default>
                                {project.description}
                            </StyledMarkdown.Default>
                        </div>
                    </>
                }
            </ContentBrief>
        </Link>
    )
}

DevProjectBrief.Container = ContentBrief.Container;