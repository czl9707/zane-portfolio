import * as T from "@/components/ui/typography";
import * as Container from "@/components/ui/container";
// import Button from '@/components/ui/button';
import DevBlogContentBlock from '@/components/dev-blog/content-blocks';
import Divider from '@/components/ui/divider';
import Spacer from "@/components/ui/spacer";
import * as SideCatagory from "@/components/layout/side-catagory"
import TitleSection from "@/components/layout/title-section";


import * as ZaneDevBlog from '@/lib/cms/zane-dev-blog'
import * as ContentBlock from '@/lib/cms/content-blocks'
import { DateAsString } from '@/lib/utils/date';

import React from 'react';
import { Metadata } from 'next';
import { css, styled } from "@pigment-css/react";


export const revalidate = 14400;
export async function generateStaticParams(): Promise<{ blogSlug: string }[]> {
    const result = await ZaneDevBlog.getAll();
    return result.map(t => ({ blogSlug: t.title.replaceAll(" ", "_") }));
}


export default async function Page({ params }: { params: Promise<{ blogSlug: string }> }) {
    const title = (await params).blogSlug.replaceAll("_", " ");
    const blog = await ZaneDevBlog.getByTitle(title);
    return <>
        <SideCatagory.Context>
            <ContentLayoutGrid>
                <ContentContainer className={css(({ theme }) => ({ marginTop: theme.size.header.height }))}>
                    <BlogHead blog={blog} />
                </ContentContainer>
                <CatagroryContainer />
            </ContentLayoutGrid>
            <Spacer spacing="block" />
            <ContentLayoutGrid>
                <ContentContainer>
                    {
                        blog.content.map((sec, i) => (
                            <Section blocks={sec.blocks} catagory={sec.catagory}
                                headerVisible={sec.visible} key={i} />
                        ))
                    }
                </ContentContainer>
                <CatagroryContainer>
                    <T.H6 style={{ marginBottom: "1rem" }}>Table of Content</T.H6>
                    <SideCatagory.CatagoryPanel />
                </CatagroryContainer>
            </ContentLayoutGrid>
        </SideCatagory.Context >
    </>
}

const ContentLayoutGrid = styled(Container.FullWidth)(({ theme }) => ({
    display: "flex", flexDirection: "row", alignItems: "start", gap: theme.spacing.component,
    maxWidth: theme.breakpoint.lg, width: "100%",
    marginLeft: "auto", marginRight: "auto",
    boxSizing: "border-box",

    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    },
}));

const ContentContainer = styled("div")({
    flex: "5 5", position: 'relative'
});
const CatagroryContainer = styled("div")(({ theme }) => ({
    flex: "2 2", position: "sticky",
    top: `calc(${theme.size.header.height} + ${theme.spacing.component})`,
    [`@media(max-width: ${theme.breakpoint.md})`]: {
        display: "none",
    },
}));


function BlogHead({ blog }: { blog: ZaneDevBlog.Info }) {
    return <>
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
    </>
}

const SectionHeaderLink = styled(TitleSection.Heading)(({ theme }) => ({
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
            <>
                <TitleSection noDivider className={css({ padding: 0 })}>
                    <SideCatagory.Link catagory={catagory}>
                        <SectionHeaderLink>{sectionName}</SectionHeaderLink>
                    </SideCatagory.Link>
                </TitleSection>
                <Spacer spacing="paragraph" />
                <Divider />
            </>
        }
        {
            blocks.map((block, i) => (
                <DevBlogContentBlock block={block} key={`${sectionName}${i}`} />
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