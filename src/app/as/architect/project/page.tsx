import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";
import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";

import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import Divider from '@/components/ui/divider';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-card';


export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}


export default async function Page() {
    const projects = (await ZaneArchProjects.getAll());

    return (
        <>
            <TitleSection>
                <T.H2>Architecture Projects</T.H2>
            </TitleSection>

            <Container.FullWidth className="bg-background">
                <Divider />
                <Grid.ColTwo className="py-group">
                    {
                        projects.sort((p1, p2) => (p2.startDate.getTime() - p1.startDate.getTime())).map(project => (
                            <ArchitectureProjectCard project={project} key={project.title}
                                href={`/as/architect/project/${project.title.replace(" ", "_")}`} />
                        ))
                    }
                </Grid.ColTwo>
            </Container.FullWidth>
        </>
    )
}