import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";

import * as ZaneDevBlog from '@/lib/cms/zane-blog'
import ContentSection from '@/components/layout/content-section';
import DevBlogBrief from '@/components/dev-blog/dev-blog-brief';
import BriefsContainer from '@/components/layout/briefs-container'

import { Metadata } from 'next';

export const revalidate = 14400;


export default async function Page() {
    const blogs = await ZaneDevBlog.getAll();

    return (
        <>
            <TitleSection noDivider>
                <TitleSection.Heading asElement='h1'>Blogs</TitleSection.Heading>
            </TitleSection>

            <ContentSection
                style={{ paddingTop: 0 }}
                header={<T.H5 asElement='h2' style={{ opacity: 0.75 }}>All Blogs</T.H5>}
            >
                <BriefsContainer style={{ gridColumn: "span 3 / span 3" }}>
                    {
                        blogs.map((blog) => (
                            <DevBlogBrief blog={blog} key={blog.title} />
                        ))
                    }
                </BriefsContainer>
            </ContentSection>
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "As a self-taught software engineer, I document my learning path through blogs.",
};