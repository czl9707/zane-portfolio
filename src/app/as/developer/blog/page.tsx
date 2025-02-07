import TitleSection from '@/components/layout/title-section';
import * as T from "@/components/ui/typography";

import * as ZaneDevBlog from '@/lib/cms/zane-dev-blog'
import ContentSection from '@/components/layout/content-section';
import DevBlogCard from '@/components/dev-blog/dev-blog-card';

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

            <ContentSection className="group/section"
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