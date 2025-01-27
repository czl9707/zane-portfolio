import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";
import * as Grid from "@/components/ui/grid";
import * as Container from "@/components/ui/container";
import Button from '@/components/ui/button';
import ArchProjectContentBlock from '@/components/arch-project/content-blocks';
import { DateRangeAsString } from '@/lib/utils/date';


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
            Object.entries(project.content).map((catagory) =>
                catagory[1].blocks.map(
                    (block, i) => (
                        <ArchProjectContentBlock block={block} key={`${catagory[0]}${i}`} />
                    )
                )
            )
        }
    </>
}

function ProjectHead({ project }: { project: ZaneArchProjects.Info }) {
    return (
        <>
            <Container.FullWidth className='mt-header py-group -mb-block'>
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

            <ArchProjectContentBlock block={{
                blockType: "fullText",
                title: "Project Overview",
                text: project.description
            }} />
        </>
    )
}