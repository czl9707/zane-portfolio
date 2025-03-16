import { Metadata } from 'next';

import TitleSection from '@/components/layout/title-section';
import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import { solidBackground } from '@/components/ui/util';

import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import Divider from '@/components/ui/divider';
import Spacer from '@/components/ui/spacer';
import ArchitectureProjectCard from '@/components/arch-project/arch-project-brief';

export const revalidate = 14400;
export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}


export default async function Page() {
    const projects = (await ZaneArchProjects.getAll());

    return (
        <>
            <TitleSection noDivider>
                <TitleSection.Heading>Architecture Projects</TitleSection.Heading>
            </TitleSection>

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

export const metadata: Metadata = {
    title: "Zane Chen - Architecture Projects",
    description: "Although no longer doing architecture, the past experience deeply shapes my mindset when doing things.",
};