import { Metadata } from 'next';

import * as ZaneBlog from '@/lib/cms/zane-blog'
import * as ZaneNote from '@/lib/cms/zane-note'
import { shuffle } from '@/lib/utils/random-array';

import * as Container from "@/components/ui/container";
import TitleSection from '@/components/layout/title-section';
import Divider from '@/components/ui/divider';
import ContentCard from '@/components/layout/content-card';

export default async function Page() {
    const blogs = ZaneBlog.getAll();
    const notes = ZaneNote.getAll();

    const writings: ((ZaneBlog.Info | ZaneNote.Info) & { link: string })[] = shuffle([
        ...(await blogs).map(b => ({ ...b, link: `/blog/by/${b.role}/${b.id}` })),
        ...(await notes).map(n => ({ ...n, link: `/note/by/${n.role}/${n.id}` })),
    ])


    return (
        <>
            <TitleSection omitDivider>
                <TitleSection.Heading asElement='h1'>
                    Mind Constellations
                </TitleSection.Heading>
            </TitleSection>
            <Container.FullWidth>
                <Divider />
                <ContentCard.Container columns={3}>
                    {
                        writings.map((w) => {
                            const isBlog = w.link.startsWith("/blog")
                            return (
                                <ContentCard key={w.link} href={w.link} title={w.title}
                                    rows={isBlog ? 2 : 1} columns={isBlog ? 2 : 1}
                                    date={isBlog ? w.createdDate : undefined} role={w.role}
                                    description={isBlog ? (w as ZaneBlog.Info).description : undefined} tags={w.tags} />
                            )
                        })
                    }
                </ContentCard.Container>
            </Container.FullWidth>
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - Mind Constellations",
    description: "As a Human Being, I kept my thoughts as a Mind Constellations.",
};