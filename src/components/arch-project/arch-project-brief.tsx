/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";

import * as ZaneArchProject from "@/lib/cms/zane-arch-project";

import style from './arch-project-brief.module.css'


export default function ArchitectureProjectCard({ project }: { project: ZaneArchProject.Info }) {
    return (
        <Link href={`/as/architect/project/${project.link}`}>
            <SlideUp.Div>
                <div className={style.CardContainer}>
                    <img src={project.cover.url} alt={project.cover.alt} />

                    <div className={style.CardInformationMask}>
                        <div style={{ flex: "1 1" }} />

                        <T.H3>{project.title.toUpperCase()}</T.H3>
                        <T.Body1 style={{ opacity: 0.75, paddingBottom: ".5rem" }}>{project.tags.join(" · ")}</T.Body1>
                        <T.H6 style={{ opacity: 0.75 }}>{project.subTitle}</T.H6>

                        <div style={{ flex: "1 1" }} />
                    </div>
                </div>
            </SlideUp.Div>
        </Link>
    )
}