import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import * as Container from "@/components/ui/container";
import Button from '@/components/ui/button';
import ArchProjectContentBlock from '@/components/arch-project/content-blocks';
import TitleSection from '@/components/layout/title-section';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-brief';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import Spacer from "@/components/ui/spacer";


import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as ContentBlock from '@/lib/cms/content-blocks'
import { randomNoRepeats } from '@/lib/utils/random-array';
import { DateRangeAsString } from '@/lib/utils/date';

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { css } from "@pigment-css/react";
import ExtendingButton from "@/components/ui/extending-button";

export const revalidate = 14400;
export async function generateStaticParams(): Promise<{ projectSlug: string }[]> {
    const result = (await ZaneArchProjects.getAll())
    return result.map(t => ({ projectSlug: t.title.replaceAll(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ projectSlug: string }> }) {
    const title = (await params).projectSlug.replaceAll("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);
    return <>
        <ProjectHead project={project} />

        {
            project.content.map((sec) => (
                <Section blocks={sec.blocks} sectionName={sec.catagory[sec.catagory.length - 1]}
                    headerVisible={sec.visible} key={sec.catagory.join("")} />
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

                    <span className={css(({ theme }) => ({
                        gridColumn: "span 1 / span 1",
                        [`@media(max-width: ${theme.breakpoint.md})`]: { display: "none" }
                    }))} />

                    <SlideUp.Div style={{ gridColumn: "span 1 / span 1" }}>
                        <T.Body1>When</T.Body1>
                        <T.H6>
                            {DateRangeAsString(project.startDate, project.endDate)}
                        </T.H6>
                        <Spacer spacing="paragraph" />

                        <T.Body1>Who</T.Body1>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Section({ sectionName, blocks, headerVisible }: {
    blocks: ContentBlock.ArchProjectType[],
    sectionName: string,
    headerVisible: boolean,
}) {
    return <>
        <Spacer spacing="block" />
        {
            blocks.map((block, i) => (
                <ArchProjectContentBlock block={block} key={`${sectionName}${i}`} />
            ))
        }
    </>
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
                    [`@media(max-width: ${theme.breakpoint.md})`]: { flexDirection: "column" },
                }))}>
                    <TitleSection.Heading>Other Projects</TitleSection.Heading>
                    <Link href={"/as/architect/project"} style={{ flex: "1 1" }}
                        className={ExtendingButton.hoverContext}>
                        <ExtendingButton label="All Projects" />
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
    { params }: { params: Promise<{ projectSlug: string }> },
): Promise<Metadata> {
    const title = (await params).projectSlug.replaceAll("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);

    return {
        title: `Zane Chen - ${project.title}`,
        description: project.subTitle,
    }
}