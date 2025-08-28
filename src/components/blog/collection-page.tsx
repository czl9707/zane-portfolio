import { Metadata } from 'next';

import * as T from "@/components/ui/typography";

import * as ZaneBlog from '@/lib/cms/zane-blog'
import ContentSection from '@/components/layout/content-section';
import BlogBrief from '@/components/blog/brief';
import BriefsContainer from '@/components/layout/briefs-container'

export async function Page() {
    const blogs = await ZaneBlog.getAll();

    return (
        <ContentSection
            style={{ paddingTop: 0 }}
            header={<T.H5 asElement='h2' style={{ opacity: 0.75 }}>All Blogs</T.H5>}
        >
            <BriefsContainer style={{ gridColumn: "span 3 / span 3" }}>
                {
                    blogs.map((blog) => (
                        <BlogBrief blog={blog} key={blog.title} />
                    ))
                }
            </BriefsContainer>
        </ContentSection>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "As a self-taught software engineer, I document my learning path through blogs.",
};