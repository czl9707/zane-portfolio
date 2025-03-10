import * as SlideUp from "@/components/ui/slideup-effect";
import * as T from "@/components/ui/typography";
import Button from '@/components/ui/button';
import DevBlogContentBlock from '@/components/dev-blog/content-blocks';
import TitleSection from '@/components/layout/title-section';
import ProjectBlogBriefSession from '@/components/layout/project-blog-brief-session';
import DevBlogCard from '@/components/dev-blog/dev-blog-card';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import Spacer from "@/components/ui/spacer";
import * as SideCatagory from "@/components/layout/side-catagory"


import * as ZaneDevBlog from '@/lib/cms/zane-dev-blog'
import * as ContentBlock from '@/lib/cms/content-blocks'
import { DateAsString } from '@/lib/utils/date';

import React from 'react';
import { Metadata } from 'next';
import { css, styled } from "@pigment-css/react";


export const revalidate = 14400;
export async function generateStaticParams(): Promise<{ blogSlug: string }[]> {
    const result = (await ZaneDevBlog.getAll())
    return result.map(t => ({ blogSlug: t.title.replaceAll(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ blogSlug: string }> }) {
    const title = (await params).blogSlug.replaceAll("_", " ");
    const blog = await ZaneDevBlog.getByTitle(title);
    return <>
        <BlogHead blog={blog} />
        <SideCatagory.Context>
            <div className={css(({ theme }) => ({
                position: "relative", display: "inline-flex", flexDirection: "column",
                gap: theme.spacing.block,
            }))}>
                <SideCatagory.CatagoryPanel className={SideCatagoryPanelClass} />
                {
                    blog.content.map((sec, i) => (
                        <Section blocks={sec.blocks} catagory={sec.catagory}
                            headerVisible={sec.visible} key={i} />
                    ))
                }

                {/* <OtherProjects current={project} /> */}
            </div>
        </SideCatagory.Context >
    </>
}

const SideCatagoryPanelClass = css(({ theme }) => ({
    position: "absolute", top: `calc(${theme.size.header.height} + ${theme.spacing.component})`,
    transition: `transform ${theme.transition.short}`,
    width: theme.size.sidePanel.width,

    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        transform: `translateX(calc(${theme.spacing.component} - 100%))`,
        "&:hover": { transform: "none" }
    },
}))

const SectionContainer = styled(SlideUp.FullWidth)(({ theme }) => ({
    "&>*": {
        maxWidth: `calc(${theme.breakpoint.lg} - 2 * ${theme.size.sidePanel.width})`, width: "100%",
        marginLeft: "auto", marginRight: "auto",
    },
}));

function BlogHead({ blog }: { blog: ZaneDevBlog.Info }) {
    return <SectionContainer className={css(({ theme }) => ({ marginTop: theme.size.header.height }))}>
        <Spacer spacing="block" />

        <T.H2>{blog.title}</T.H2>
        <Spacer spacing="paragraph" />

        <T.H5 style={{ opacity: 0.75 }}>
            {blog.description}
        </T.H5>

        <Spacer spacing="component" />
        <T.Body1>
            <span style={{ opacity: 0.75 }}>Created On </span>{DateAsString(blog.createdDate)}
            {
                blog.tags && <>
                    <span style={{ opacity: 0.75 }}> With Tags </span>{blog.tags.join(", ")}
                </>
            }
        </T.Body1>
    </SectionContainer>
}

const SectionHeaderLink = styled(T.H3)(({ theme }) => ({
    "&::before": {
        content: "\"#\"", position: "absolute",
        transform: "translateX(-135%)",
        transition: `opacity ${theme.transition.short}`,
        opacity: 0,
    },
    "&:hover::before": {
        opacity: 0.3,
    }
}));

function Section({ catagory, blocks, headerVisible }: {
    blocks: ContentBlock.DevBlogType[],
    catagory: string[],
    headerVisible: boolean,
}) {
    const sectionName = catagory[catagory.length - 1];
    return <SideCatagory.Container catagory={catagory}>
        {
            headerVisible &&
            <SideCatagory.Link catagory={catagory}>
                <SectionContainer>
                    <SectionHeaderLink>{sectionName}</SectionHeaderLink>
                    <Spacer spacing="paragraph" />
                    <Divider />
                </SectionContainer>
            </SideCatagory.Link>
        }
        {
            blocks.map((block, i) => (
                <SectionContainer key={`${sectionName}${i}`} >
                    <DevBlogContentBlock block={block} />
                </SectionContainer>
            ))
        }
    </SideCatagory.Container>
}



export async function generateMetadata(
    { params }: { params: Promise<{ blogSlug: string }> },
): Promise<Metadata> {
    const title = (await params).blogSlug.replaceAll("_", " ");
    const blog = await ZaneDevBlog.getByTitle(title);

    return {
        title: `Zane Chen - ${blog.title}`,
        description: blog.description,
    }
}