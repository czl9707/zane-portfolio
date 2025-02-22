import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";
import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";

import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import Divider from '@/components/ui/divider';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-card';
import { Metadata } from 'next';

export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}


export default async function Page() {
    const projects = (await ZaneArchProjects.getAll());

    return (
        <>
            <TitleSection noDivider>
                <T.H2>Architecture Projects</T.H2>
            </TitleSection>

            <Container.FullWidth className="bg-background">
                <Divider />
                <Grid columns={2} className="py-group">
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

export const metadata: Metadata = {
    title: "Zane Chen - Architecture Projects",
    description: "Although no longer doing architecture, the past experience deeply shapes my mindset when doing things.",
};