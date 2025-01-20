/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { twJoin } from "tailwind-merge";

import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import StyledMarkdown from "@/components/ui/styled-markdown";

import * as ZaneArchProject from "@/lib/cms/zane-arch-project";


export default function ArchitectureProjectCard({ project }: { project: ZaneArchProject.Info, href: string }) {
    return (
        <Link href={`/as/developer/project/${project.title.replace(" ", "_")}`}>
            <SlideUp.Div className="group/card relative">
                <div className={"overflow-hidden rounded aspect-[4/3] w-full flex-1 relative"}>
                    <img src={project.cover.url} alt={project.cover.alt}
                        className={twJoin(
                            "w-full h-full object-cover absolute",
                            "group-hover/card:scale-105 duration-500"
                        )} />

                    <div className={twJoin(
                        "absolute inset-0 opacity-0 bg-background/75 text-foreground p-8",
                        "flex flex-col",
                        "group-hover/card:opacity-100 duration-500"
                    )} >
                        <div className="flex-1" />

                        <T.H5 className="text-foreground/75">{project.subTitle}</T.H5>
                        <div className="pt-4 overflow-y-clip overscroll-contain">
                            <StyledMarkdown>
                                {project.description.toString()}
                            </StyledMarkdown>
                        </div>
                    </div>
                </div>

                <div className={"pt-2"}>
                    <T.H5>{project.title}</T.H5>
                    <div className="flex-1" />
                    <T.Body2 className="text-foreground/75">
                        {
                            project.startDate.getFullYear()}.{project.startDate.getMonth() + 1
                        } - {project.endDate ?
                            `${project.endDate.getFullYear()}.${project.endDate.getMonth() + 1}` :
                            "Ongoing"
                        }
                    </T.Body2>
                </div>
            </SlideUp.Div>
        </Link>
    )
}