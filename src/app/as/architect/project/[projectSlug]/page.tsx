import * as T from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import * as Container from "@/components/ui/container";
import Button from '@/components/ui/button';
import ArchProjectContentBlock from '@/components/arch-project/content-blocks';
import TitleSection from '@/components/layout/title-section';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-brief';
import Divider from '@/components/ui/divider';
import Spacer from "@/components/ui/spacer";
import ExtendingButton from "@/components/ui/extending-button";

import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as ContentBlock from '@/lib/cms/content-blocks'
import { randomNoRepeats } from '@/lib/utils/random-array';
import { DateRangeAsString } from '@/lib/utils/date';
import { themeVars } from "@/lib/theme";

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from "next/navigation";

import style from './page.module.css'
import StickyHero from "@/components/layout/sticky-hero";

export const revalidate = 14400;
export async function generateStaticParams(): Promise<{ projectSlug: string }[]> {
    const result = (await ZaneArchProjects.getAll())
    return result.map(t => ({ projectSlug: t.link }));
}


export default async function Page({ params }: { params: Promise<{ projectSlug: string }> }) {
    const link = (await params).projectSlug;
    const project = await ZaneArchProjects.getByLink(link).then(
        p => p,
        () => notFound(),
    );
    return <>
        <ProjectHead project={project} />

        <Container.FullWidth style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
            <Divider />

            <ArchProjectContentBlock block={{
                blockType: "fullText",
                title: "Project Overview",
                text: project.description
            }} />
            {
                project.content.map((sec) => (
                    <Section blocks={sec.blocks} sectionName={sec.catagory[sec.catagory.length - 1]}
                        headerVisible={sec.visible} key={sec.catagory.join("")} />
                ))
            }
        </Container.FullWidth>

        <OtherProjects current={project} />
    </>
}

function ProjectHead({ project }: { project: ZaneArchProjects.Info }) {
    return (
        <StickyHero>
            <Container.FullWidth>
                <Spacer spacing="group" />
                <Grid columns={4} style={{ alignItems: "flex-end" }}>
                    <div style={{ gridColumn: "span 2 / span 2" }}>
                        <T.H2 asElement='h1'>{project.title.toUpperCase()}</T.H2>
                        <T.H5 asElement='h2' style={{ opacity: 0.75, textWrap: "pretty" }}>
                            {project.subTitle}
                        </T.H5>
                        <div className={style.TagContainer}>
                            {
                                project.tags?.map(t => (
                                    <Button style={{ pointerEvents: "none" }}
                                        variant='outline' key={t}>
                                        {t}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>

                    <span className={style.ProjectHeadSpacer} />

                    <div style={{ gridColumn: "span 1 / span 1" }}>
                        <T.Body1>When</T.Body1>
                        <T.H6>
                            {DateRangeAsString(project.startDate, project.endDate)}
                        </T.H6>
                        <Spacer spacing="paragraph" />

                        <T.Body1>Who</T.Body1>
                        <T.H6>{project.contributors}</T.H6>
                    </div>
                </Grid>

                <ArchProjectContentBlock block={{
                    blockType: "fullSizeImage",
                    image: project.cover
                }} />
                <Spacer />

            </Container.FullWidth>
        </StickyHero>
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
                <div className={style.TitleContainer}>
                    <TitleSection.Heading>Other Projects</TitleSection.Heading>
                    <Link href={"/as/architect/project"} style={{ flex: "1 1" }}
                        className={ExtendingButton.hoverContext}>
                        <ExtendingButton label="All Projects" />
                    </Link>
                </div>
            </TitleSection >

            <Container.FullWidth style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
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
    const link = (await params).projectSlug;
    const project = await ZaneArchProjects.getByLink(link);

    return {
        title: `Zane Chen - ${project.title}`,
        description: project.subTitle,
    }
}