import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";
import * as Container from "@/components/ui/container";

import * as ZaneDevProject from '@/lib/cms/zane-dev-project'
import Divider from '@/components/ui/divider';


export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}


export default async function Page() {
    const projects = (await ZaneDevProject.getAll());

    return (
        <>
            <TitleSection>
                <T.H2>Dev Projects</T.H2>
            </TitleSection>

            <Container.FullWidth className="bg-background">
                <Divider />
                {/* <Grid.ColTwo className="py-group">
                    {
                        projects.sort((p1, p2) => (p2.startDate.getTime() - p1.startDate.getTime())).map(project => (
                            <ArchitectureProjectCard project={project} key={project.title}
                                href={`/as/architect/project/${project.title.replace(" ", "_")}`} />
                        ))
                    }
                </Grid.ColTwo> */}
            </Container.FullWidth>
        </>
    )
}