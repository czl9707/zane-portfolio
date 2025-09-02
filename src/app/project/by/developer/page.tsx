import { Metadata } from 'next';

import * as ZaneDevProject from '@/lib/cms/zane-dev-project'
import * as Container from "@/components/ui/container";
import TitleSection from '@/components/layout/title-section';
import Divider from '@/components/ui/divider';
import ContentCard from '@/components/layout/content-card';


export default async function Page() {
    const projects = (await ZaneDevProject.getAll());

    return (
        <>
            <TitleSection omitDivider>
                <TitleSection.Heading asElement='h1'>
                    Projects By a Developer
                </TitleSection.Heading>
            </TitleSection>
            <Container.FullWidth>
                <Divider />
                <ContentCard.Container>
                {
                    projects.map((project) => (
                    <ContentCard href={project.externalLink} target="_blank" key={project.title} rows={2}
                        date={project.startDate} title={project.title}
                        description={project.description} tags={project.tags} />
                    ))
                }
                {projects.length % 2 === 1 && <span/>}
                </ContentCard.Container>
            </Container.FullWidth>
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "I thrive on building seamless solutions, bridging gaps in technologies with innovative ideas.",
};