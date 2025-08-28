import { Metadata } from 'next';

import * as T from "@/components/ui/typography";

import * as ZaneDevProject from '@/lib/cms/zane-dev-project'
import ContentSection from '@/components/layout/content-section';
import DevProjectBrief from '@/components/dev-project/brief';
import BriefsContainer from '@/components/layout/briefs-container'

export async function Page() {
    const projects = (await ZaneDevProject.getAll());

    return (
        <ContentSection
            style={{ paddingTop: 0 }}
            header={<T.H5 asElement='h2' style={{ opacity: 0.75 }}>All Projects</T.H5>}
        >
            <BriefsContainer style={{ gridColumn: "span 3 / span 3", }}>
                {
                    projects.map((project) => (
                        <DevProjectBrief project={project} key={project.title} />
                    ))
                }
            </BriefsContainer>
        </ContentSection>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "I thrive on building seamless solutions, bridging gaps in technologies with innovative ideas.",
};