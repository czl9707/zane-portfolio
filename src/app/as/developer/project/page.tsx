import { Metadata } from 'next';

import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";

import * as ZaneDevProject from '@/lib/cms/zane-dev-project'
import ContentSection from '@/components/layout/content-section';
import DevProjectBrief from '@/components/dev-project/dev-project-card';
import BriefsContainer from '@/components/layout/briefs-container'

export const revalidate = 14400;

export default async function Page() {
    const projects = (await ZaneDevProject.getAll());

    return (
        <>
            <TitleSection noDivider>
                <TitleSection.Heading>Dev Projects</TitleSection.Heading>
            </TitleSection>

            <ContentSection
                style={{ paddingTop: 0 }}
                header={<T.H5 style={{ opacity: 0.75 }}>All Projects</T.H5>}
            >
                <BriefsContainer style={{ gridColumn: "span 3 / span 3", }}>
                    {
                        projects.map((project) => (
                            <DevProjectBrief project={project} key={project.title} />
                        ))
                    }
                </BriefsContainer>
            </ContentSection>
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "I thrive on building seamless solutions, bridging gaps in technologies with innovative ideas.",
};