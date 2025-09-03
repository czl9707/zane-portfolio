import { Metadata } from 'next';

import * as ZaneBlog from '@/lib/cms/zane-blog'
import * as ZaneNote from '@/lib/cms/zane-note'

import * as Container from "@/components/ui/container";
import TitleSection from '@/components/layout/title-section';
import Divider from '@/components/ui/divider';
import ContentCard from '@/components/layout/content-card';
import { shuffle } from '@/lib/utils/random-array';

export default async function Page() {
    const blogsP = ZaneBlog.getAll();
    const notesP = ZaneNote.getAll();

    const writings = arrangeContent(
        shuffle(await notesP),
        (await blogsP).toSorted((b1, b2) => b2.createdDate > b1.createdDate ? 1 : -1)
    );

    return (
        <>
            <TitleSection omitDivider>
                <TitleSection.Heading asElement='h1'>
                    Mind Constellations
                </TitleSection.Heading>
            </TitleSection>
            <Container.FullWidth>
                <Divider />
                <ContentCard.Container>
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

function arrangeContent(notes: ZaneNote.Info[], blogs: ZaneBlog.Info[]): ((ZaneBlog.Info | ZaneNote.Info) & { link: string })[]
{
    const FACTOR = 3;
    const writings: ((ZaneBlog.Info | ZaneNote.Info) & { link: string })[] = [];
    for (let i = 0; i < blogs.length || i * FACTOR < notes.length; i ++)
    {
        if (i < blogs.length)
        {
            const blog = blogs[i];
            writings.push({ ...blog, link: `/blog/by/${blog.role}/${blog.id}` });
        }

        for (let j = 0; j < FACTOR && j + i * FACTOR < notes.length; j ++)
        {
            const note = notes[j + i * FACTOR];
            writings.push({ ...note, link: `/note/by/${note.role}/${note.id}` })
        }
    }

    return writings;
}

export const metadata: Metadata = {
    title: "Zane Chen - Mind Constellations",
    description: "As a Human Being, I kept my thoughts as a Mind Constellations.",
};