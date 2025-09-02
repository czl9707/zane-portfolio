import { Metadata } from 'next';

import * as ZaneBlog from '@/lib/cms/zane-blog'
import * as Container from "@/components/ui/container";
import TitleSection from '@/components/layout/title-section';
import Divider from '@/components/ui/divider';
import ContentCard from '@/components/layout/content-card';

export default async function Page() {
    const blogs = await ZaneBlog.getAll();

    return (
        <>
            <TitleSection omitDivider>
                <TitleSection.Heading asElement='h1'>
                    All Posts
                </TitleSection.Heading>
            </TitleSection>
            <Container.FullWidth>
                <Divider />
                <ContentCard.Container>
                {
                    blogs.map((blog) => (
                    <ContentCard href={`/blog/by/${blog.role}/${blog.id}`} key={blog.id} rows={2}
                        date={blog.createdDate} title={blog.title}
                        description={blog.description} tags={blog.tags} />
                    ))
                }
                </ContentCard.Container>
            </Container.FullWidth>
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Posts Collection",
    description: "As a self-taught software engineer, I document my learning path through posts.",
};