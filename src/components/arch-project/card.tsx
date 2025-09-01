/* eslint-disable @next/next/no-img-element */
import * as T from "@/components/ui/typography";
import * as Card from '@/components/layout/card'

import type * as ZaneArchProject from "@/lib/cms/zane-arch-project";

import style from './card.module.css'

export default function ArchitectureProjectCard({ project }: { project: ZaneArchProject.Info }) {
    return (
        <Card.Base href={`/project/by/architect/${project.id}`} className={style.CardContainer}>
            <img src={project.cover.url} alt={project.cover.alt} />
            <div className={style.CardInformationMask}>
                <div style={{ flex: "1 1" }} />

                <T.H3>{project.title.toUpperCase()}</T.H3>
                <T.Body1 style={{ opacity: 0.75, paddingBottom: ".5rem" }}>{project.tags.join(" · ")}</T.Body1>
                <T.H6 style={{ opacity: 0.75 }}>{project.subTitle}</T.H6>

                <div style={{ flex: "1 1" }} />
            </div>
        </Card.Base>
    )
}

ArchitectureProjectCard.Container = Card.Container;