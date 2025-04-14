/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { styled } from "@pigment-css/react";

import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";

import * as ZaneArchProject from "@/lib/cms/zane-arch-project";

const CardInformationMask = styled("div")(({ theme }) => ({
    position: "absolute", inset: 0, backgroundColor: `rgb(${theme.vars.color.default.background} / 75%)`,
    color: `rgb(${theme.vars.color.default.foreground})`, padding: theme.spacing.component,
    display: "flex", flexDirection: "column",
    transition: `opacity ${theme.transition.short}`,
}));

const CardContainer = styled("div")(({ theme }) => ({
    overflow: "hidden", borderRadius: theme.size.border.radius, aspectRatio: "4/3",
    width: "100%", position: "relative",

    "img": {
        position: "absolute", objectFit: "cover", height: "100%", width: "100%",
        transition: `transform ${theme.transition.short}`,
    },
    [`${CardInformationMask}`]: { opacity: 0 },
    [`${T.H3}, ${T.H6}, ${T.Body1}`]: { textAlign: "center" },

    "&:hover": {
        "img": {
            transition: "scaleX(105%) scaleY(105%)",
        },
        [`${CardInformationMask}`]: { opacity: 1 }
    },
}))

export default function ArchitectureProjectCard({ project }: { project: ZaneArchProject.Info }) {
    return (
        <Link href={`/as/architect/project/${project.link}`}>
            <SlideUp.Div>
                <CardContainer>
                    <img src={project.cover.url} alt={project.cover.alt} />

                    <CardInformationMask>
                        <div style={{ flex: "1 1" }} />

                        <T.H3>{project.title.toUpperCase()}</T.H3>
                        <T.Body1 style={{ opacity: 0.75, paddingBottom: ".5rem" }}>{project.tags.join(" · ")}</T.Body1>
                        <T.H6 style={{ opacity: 0.75 }}>{project.subTitle}</T.H6>

                        <div style={{ flex: "1 1" }} />
                    </CardInformationMask>
                </CardContainer>
            </SlideUp.Div>
        </Link>
    )
}