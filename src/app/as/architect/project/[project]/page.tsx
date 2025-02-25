import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import * as Container from "@/components/ui/container";
import Button from '@/components/ui/button';
import ArchProjectContentBlock from '@/components/arch-project/content-blocks';
import TitleSection from '@/components/layout/title-section';
import ProjectBlogBriefSession from '@/components/layout/project-blog-brief-session';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-card';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import Spacer from "@/components/ui/spacer";


import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import { randomNoRepeats } from '@/lib/utils/random-array';
import { DateRangeAsString } from '@/lib/utils/date';

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { css } from "@pigment-css/react";


export async function generateStaticParams(): Promise<{ project: string }[]> {
    const result = (await ZaneArchProjects.getAll())
    return result.map(t => ({ project: t.title.replaceAll(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ project: string }> }) {
    const title = (await params).project.replaceAll("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);
    return <>
        <ProjectHead project={project} />

        {
            Object.entries(project.content).map((catagory) => (
                <React.Fragment key={catagory[0]}>
                    <Spacer spacing="block" />
                    {
                        catagory[1].blocks.map(
                            (block, i) => (
                                <ArchProjectContentBlock block={block} key={`${catagory[0]}${i}`} />
                            )
                        )
                    }
                </React.Fragment>
            ))
        }

        <OtherProjects current={project} />
    </>
}

function ProjectHead({ project }: { project: ZaneArchProjects.Info }) {
    return (
        <>
            <Container.FullWidth className={css(({ theme }) => ({
                marginTop: theme.size.header.height, paddingTop: theme.spacing.group, paddingBottom: theme.spacing.group
            }))}>
                <Grid columns={4} style={{ alignItems: "flex-end" }}>
                    <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                        <T.H2 >{project.title.toUpperCase()}</T.H2>
                        <T.H5 style={{ opacity: 0.75, textWrap: "pretty" }}>{project.subTitle}</T.H5>
                        <div className={css(({ theme }) => ({
                            display: "inline-flex", flexDirection: "row", flexWrap: "wrap",
                            paddingTop: theme.spacing.paragraph, gap: ".5rem"
                        }))}>
                            {
                                project.tags?.map(t => (
                                    <Button style={{ pointerEvents: "none" }}
                                        variant='outline' key={t}>
                                        {t}
                                    </Button>
                                ))
                            }
                        </div>
                    </SlideUp.Div>

                    <span style={{ gridColumn: "span 1 / span 1" }} />

                    <SlideUp.Div style={{ gridColumn: "span 1 / span 1" }}>
                        <T.Body1 style={{ opacity: 0.75, paddingBottom: 0 }}>When</T.Body1>
                        <T.H6>
                            {DateRangeAsString(project.startDate, project.endDate)}
                        </T.H6>
                        <Spacer spacing="paragraph" />

                        <T.Body1 style={{ opacity: 0.75, paddingBottom: 0 }}>Who</T.Body1>
                        <T.H6>{project.contributors}</T.H6>
                    </SlideUp.Div>
                </Grid>
            </Container.FullWidth>

            <ArchProjectContentBlock block={{
                blockType: "fullSizeImage",
                image: project.cover
            }} />
            <Spacer />
            <ArchProjectContentBlock block={{
                blockType: "fullText",
                title: "Project Overview",
                text: project.description
            }} />
        </>
    )
}

async function OtherProjects({ current }: { current: ZaneArchProjects.Info }) {
    const allprojects = (await ZaneArchProjects.getAll()).filter(p => p.title != current.title);
    const getRandom = randomNoRepeats(allprojects);
    const projects = [...Array(4)].map(() => getRandom());

    return (
        <>
            <TitleSection>
                <div className={css(({ theme }) => ({
                    display: "flex", flexDirection: "row", width: "100%", alignItems: "flex-end",
                    [`@media(max-width: ${theme.breakpoint.lg})`]: { flexDirection: "column" },
                }))}>
                    <T.H2 id="as_an_architect">Other Projects</T.H2>
                    <Link href={"/as/architect/project"} style={{ flex: "1 1" }}>
                        <ProjectBlogBriefSession buttonText="All Projects" noDivider />
                    </Link>
                </div>
            </TitleSection >

            <Container.FullWidth className={solidBackground}>
                <Divider />
                <Spacer />
                <Grid columns={2}>
                    {
                        projects.sort((p1, p2) => (p2.startDate.getTime() - p1.startDate.getTime())).map(project => (
                            <ArchitectureProjectCard project={project} key={project.title} />
                        ))
                    }
                </Grid>
            </Container.FullWidth>
        </>
    )
}

export async function generateMetadata(
    { params }: { params: Promise<{ project: string }> },
): Promise<Metadata> {
    const title = (await params).project.replaceAll("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);

    return {
        title: `Zane Chen - ${project.title}`,
        description: project.subTitle,
    }
}