import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";
import * as Grid from "@/components/ui/grid";
import * as Container from "@/components/ui/container";
import Button from '@/components/ui/button';
import ArchProjectContentBlock from '@/components/arch-project/content-blocks';
import { DateRangeAsString } from '@/lib/utils/date';
import React from 'react';
import TitleSection from '@/components/layout/title-section';
import Link from 'next/link';
import ProjectBlogBriefSession from '@/components/layout/project-blog-brief-session';
import Divider from '@/components/ui/divider';
import { randomNoRepeats } from '@/lib/utils/random-array';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-card';


export async function generateStaticParams(): Promise<{ project: string }[]> {
    const result = (await ZaneArchProjects.getAll())
    return result.map(t => ({ project: t.title.replace(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ project: string }> }) {
    const title = (await params).project.replace("_", " ");
    const project = await ZaneArchProjects.getByTitle(title);
    return <>
        <ProjectHead project={project} />

        {
            Object.entries(project.content).map((catagory) => (
                <React.Fragment key={catagory[0]}>
                    <span className='block my-block' />
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
            <Container.FullWidth className='mt-header py-group'>
                <Grid.ColFour className='items-end'>
                    <SlideUp.Div className='col-span-2'>
                        <T.H2 >{project.title.toUpperCase()}</T.H2>
                        <T.H5 className='text-pretty text-foreground/75'>{project.subTitle}</T.H5>
                        <div className='inline-flex flex-row flex-wrap pt-6 gap-2'>
                            {
                                project.tags?.map(t => (
                                    <Button className='pointer-events-none'
                                        variant='outline' key={t}>
                                        <T.Button>{t}</T.Button>
                                    </Button>
                                ))
                            }
                        </div>
                    </SlideUp.Div>

                    <div className='col-span-1' />

                    <SlideUp.Div className='col-span-1'>
                        <T.Body1 className='text-foreground/75 mt-paragraph pb-0'>When</T.Body1>
                        <T.H6>
                            {DateRangeAsString(project.startDate, project.endDate)}
                        </T.H6>

                        <T.Body1 className='text-foreground/75 mt-paragraph pb-0'>
                            Who
                        </T.Body1>
                        <T.H6>
                            {project.contributors}
                        </T.H6>
                    </SlideUp.Div>

                </Grid.ColFour>
            </Container.FullWidth>

            <ArchProjectContentBlock block={{
                blockType: "fullSizeImage",
                image: project.cover
            }} />
            <span className='block my-block' />
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
                <div className="flex flex-row w-full">
                    <T.H2 id="as_an_architect">Other Projects</T.H2>
                    <Link href={"/as/architect/project"} className="flex-1">
                        <ProjectBlogBriefSession buttonText="All Projects" withDivider={false} />
                    </Link>
                </div>
            </TitleSection >

            <Container.FullWidth className="bg-background">
                <Divider />
                <Grid.ColTwo className="py-group">
                    {
                        projects.sort((p1, p2) => (p2.startDate.getTime() - p1.startDate.getTime())).map(project => (
                            <ArchitectureProjectCard project={project} key={project.title} />
                        ))
                    }
                </Grid.ColTwo>
            </Container.FullWidth>
        </>
    )
}