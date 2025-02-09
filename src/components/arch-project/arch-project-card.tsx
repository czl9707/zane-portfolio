/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { twJoin } from "tailwind-merge";

import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";

import * as ZaneArchProject from "@/lib/cms/zane-arch-project";


export default function ArchitectureProjectCard({ project }: { project: ZaneArchProject.Info }) {
    return (
        <Link href={`/as/architect/project/${project.title.replaceAll(" ", "_")}`}>
            <SlideUp.Div className="group/card relative">
                <div className={"overflow-hidden rounded aspect-[4/3] w-full flex-1 relative"}>
                    <img src={project.cover.url} alt={project.cover.alt}
                        className={twJoin(
                            "w-full h-full object-cover absolute",
                            "group-hover/card:scale-105 duration-500"
                        )} />

                    <div className={twJoin(
                        "absolute inset-0 opacity-0 bg-background/75 text-foreground p-component",
                        "flex flex-col",
                        "group-hover/card:opacity-100 duration-500"
                    )} >
                        <div className="flex-1" />

                        <T.H3 className="text-center">{project.title.toUpperCase()}</T.H3>
                        <T.Body1 className="text-foreground/75 text-center">{project.tags.join(" · ")}</T.Body1>
                        <T.H6 className="text-foreground/75 text-center">{project.subTitle}</T.H6>

                        <div className="flex-1" />
                    </div>
                </div>
            </SlideUp.Div>
        </Link>
    )
}