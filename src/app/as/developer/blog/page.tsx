import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";

import * as ZaneDevBlog from '@/lib/cms/zane-dev-blog'
import ContentSection from '@/components/layout/content-section';
import DevBlogCard from '@/components/dev-blog/dev-blog-card';
import { Metadata } from 'next';

export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}


export default async function Page() {
    const blogs = (await ZaneDevBlog.getAll());

    return (
        <>
            <TitleSection noDivider>
                <T.H2>Blogs</T.H2>
            </TitleSection>

            <ContentSection
                header={<T.H5 className="text-foreground/75">All Blogs</T.H5>}
            >
                <div className="col-span-3 -mt-group">
                    {
                        blogs.map((blog) => (
                            <DevBlogCard blog={blog} key={blog.title} />
                        ))
                    }
                </div>
            </ContentSection>
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Dev Projects",
    description: "As a self-taught software engineer, I document my learning path through blogs.",
};