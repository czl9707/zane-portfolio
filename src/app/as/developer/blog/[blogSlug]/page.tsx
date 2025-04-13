import * as T from "@/components/ui/typography";
import DevBlogContentBlock from '@/components/dev-blog/content-block';
import Divider from '@/components/ui/divider';
import Spacer from "@/components/ui/spacer";
import * as SideCatagory from "@/components/layout/side-catagory"
import * as BlogPageLayout from "@/components/dev-blog/page-layout";

import * as ZaneDevBlog from '@/lib/cms/zane-dev-blog'
import { DateAsString } from '@/lib/utils/date';

import React from 'react';
import { Metadata } from 'next';
import { css } from "@pigment-css/react";
import { notFound } from "next/navigation";
import { extractTOC } from "@/components/ui/markdown/component.directory";


export const revalidate = 14400;
export async function generateStaticParams(): Promise<{ blogSlug: string }[]> {
    const result = await ZaneDevBlog.getAll();
    return result.map(t => ({ blogSlug: t.title.replaceAll(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ blogSlug: string }> }) {
    const title = (await params).blogSlug.replaceAll("_", " ");
    const blog = await ZaneDevBlog.getByTitle(title).then(
        b => b,
        () => notFound(),
    );

    const toc = []
    for (const block of blog.content) {
        if (block.blockType === "markdown") {
            toc.push(...extractTOC(block.markdown))
        }
    }

    return (
        <SideCatagory.Context catagories={toc}>
            <BlogHead blog={blog} />
            <BlogPageLayout.Layout>
                <Divider style={{ gridColumn: "1 / -1" }} />
                <BlogPageLayout.Content>
                    {
                        blog.content.map((block, i) => (
                            <DevBlogContentBlock block={block} key={i} />
                        ))
                    }
                </BlogPageLayout.Content>
                <BlogPageLayout.Catagory>
                    <T.H6 style={{ marginBottom: "1rem" }}>Table of Content</T.H6>
                    <SideCatagory.CatagoryPanel />
                </BlogPageLayout.Catagory>
            </BlogPageLayout.Layout>
        </SideCatagory.Context >
    )
}

function RespondingText({ BigComp, SmallComp, children, style }: {
    BigComp: React.ElementType<React.HTMLProps<HTMLDivElement>>,
    SmallComp: React.ElementType<React.HTMLProps<HTMLDivElement>>,
    children: string, style?: React.CSSProperties
}) {
    return <>
        <BigComp style={style} className={
            css(({ theme }) => ({
                [`@media(max-width: ${theme.breakpoint.sm})`]: { display: "none" },
            }))}>{children}</BigComp>
        <SmallComp style={style} className={
            css(({ theme }) => ({
                [`@media(min-width: ${theme.breakpoint.sm})`]: { display: "none" },
            }))}>{children}</SmallComp>
    </>
}

function BlogHead({ blog }: { blog: ZaneDevBlog.Info }) {
    return <>
        <BlogPageLayout.Layout className={css(({ theme }) => ({
            paddingTop: `calc(${theme.size.header.height})`,
            position: "sticky", top: "0", minHeight: "100vh",
        }))}>
            <BlogPageLayout.Content style={{ margin: "auto" }}>
                <RespondingText BigComp={T.H2} SmallComp={T.H4}>
                    {blog.title}
                </RespondingText>
                <Spacer spacing="paragraph" />

                <RespondingText BigComp={T.H5} SmallComp={T.Body1} style={{ opacity: 0.75 }}>
                    {blog.description}
                </RespondingText>

                <Spacer spacing="component" />
                <T.Body1>
                    <span style={{ opacity: 0.75 }}>Created On </span>{DateAsString(blog.createdDate)}
                    {
                        blog.tags && <>
                            <span style={{ opacity: 0.75 }}> With Tags </span>{blog.tags.join(", ")}
                        </>
                    }
                </T.Body1>
            </BlogPageLayout.Content>
            <BlogPageLayout.Catagory />
        </BlogPageLayout.Layout>
    </>
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