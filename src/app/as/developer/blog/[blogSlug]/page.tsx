import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import * as Container from "@/components/ui/container";
import Button from '@/components/ui/button';
import DevBlogContentBlock from '@/components/dev-blog/content-blocks';
import TitleSection from '@/components/layout/title-section';
import ProjectBlogBriefSession from '@/components/layout/project-blog-brief-session';
import DevBlogCard from '@/components/dev-blog/dev-blog-card';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import Spacer from "@/components/ui/spacer";


import * as ZaneDevBlog from '@/lib/cms/zane-dev-blog'
import * as ContentBlock from '@/lib/cms/content-blocks'
import { DateAsString } from '@/lib/utils/date';

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { css, styled } from "@pigment-css/react";


export default async function Page({ params }: { params: Promise<{ blogSlug: string }> }) {
    const title = (await params).blogSlug.replaceAll("_", " ");
    const project = await ZaneDevBlog.getByTitle(title);
    return <>
        {/* <ProjectHead project={project} /> */}

        {
            project.content.map((sec) => (
                <Section blocks={sec.blocks} sectionName={sec.catagory[sec.catagory.length - 1]}
                    headerVisible={sec.visible} key={sec.catagory.join("")} />
            ))
        }

        {/* <OtherProjects current={project} /> */}
    </>
}


const SectionContainer = styled(SlideUp.FullWidth)(({ theme }) => ({
    "&>div": {
        maxWidth: "54rem", width: "100%",
        marginLeft: "auto", marginRight: "auto",
    },
}));

function Section({ sectionName, blocks, headerVisible }: {
    blocks: ContentBlock.DevBlogType[],
    sectionName: string,
    headerVisible: boolean,
}) {
    return <>
        <Spacer spacing="block" />
        {
            headerVisible &&
            <SectionContainer>
                <div>
                    <T.H3>{sectionName}</T.H3>
                    <Spacer spacing="paragraph" />
                    <Divider />
                </div>
            </SectionContainer>
        }
        {
            blocks.map((block, i) => (
                <SectionContainer key={`${sectionName}${i}`} >
                    <DevBlogContentBlock block={block} />
                </SectionContainer>
            ))
        }
    </>
}

export async function generateStaticParams(): Promise<{ blogSlug: string }[]> {
    const result = (await ZaneDevBlog.getAll())
    return result.map(t => ({ blogSlug: t.title.replaceAll(" ", "_") }));
}