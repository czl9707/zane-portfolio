import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";

import * as ZaneDevProject from '@/lib/cms/zane-dev-project'
import ContentSection from '@/components/layout/content-section';
import DevProjectCard from '@/components/dev-project/dev-project-card';

export const revalidate = 14400;

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


            <ContentSection className="group/section"
                header={
                    <T.H5 className="text-foreground/75">All Projects</T.H5>
                }
            >
                <div className="col-span-3 -mt-group">
                    {
                        projects.map((project) => (
                            <DevProjectCard project={project} key={project.title} />
                        ))
                    }
                </div>

            </ContentSection>
        </>
    )
}