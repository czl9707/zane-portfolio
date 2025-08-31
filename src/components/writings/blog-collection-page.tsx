import { Metadata } from 'next';

import * as T from "@/components/ui/typography";

import * as ZaneBlog from '@/lib/cms/zane-blog'
import ContentSection from '@/components/layout/content-section';
import BlogBrief from '@/components/writings/blog-brief';

export async function Page() {
    const blogs = await ZaneBlog.getAll();

    return (
        <ContentSection
            style={{ paddingTop: 0 }}
            header={<T.H6 asElement='h2' style={{ opacity: 0.75 }}>All Blogs</T.H6>}
        >
            <BlogBrief.Container style={{ gridColumn: "span 3 / span 3" }}>
                {
                    blogs.map((blog) => (
                        <BlogBrief withDescription blog={blog} key={blog.title} />
                    ))
                }
            </BlogBrief.Container>
        </ContentSection>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "As a self-taught software engineer, I document my learning path through blogs.",
};