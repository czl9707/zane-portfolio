import 'server-only'

import type { RoleType } from '@/lib/constants';
import * as T from "@/components/ui/typography";
import * as DevBlogContentBlock from '@/components/blog/content-block';
import Divider from '@/components/ui/divider';
import Spacer from "@/components/ui/spacer";
import * as SideCatagory from "@/components/layout/side-catagory"
import * as BlogPageLayout from "@/components/blog/page-layout";
import StickyHero from '@/components/layout/sticky-hero';

import * as ZaneDevBlog from '@/lib/cms/zane-blog'
import { DateAsString } from '@/lib/utils/date';

import React from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";

import style from './content-page.module.css';

export async function generateStaticParams(): Promise<{link:string, role: RoleType}[]> {
    const result = await ZaneDevBlog.getAll();
    return result.map(b => ({link: b.link, role: b.role}));
}

export async function generateMetadata(role: RoleType, link: string): Promise<Metadata> {
    const blog = await ZaneDevBlog.getByRoleAndLink(role, link);

    return {
        title: `Zane Chen - ${blog.title}`,
        description: blog.description,
    }
}

export async function Page({link, role}:{link: string, role: RoleType}) {
    const blog = await ZaneDevBlog.getByRoleAndLink(role, link).then(
        b => b,
        () => notFound(),
    );

    const markdownBlocks = DevBlogContentBlock.toMarkdownBlocks(blog.content);

    return (
        <SideCatagory.Context catagories={
            markdownBlocks
                .filter(b => b.hash != undefined)
                .map(doc => ({ ...doc, markdown: undefined }))
        }>
            <BlogHead blog={blog} />
            <BlogPageLayout.Layout>
                <Divider style={{ gridColumn: "1 / -1" }} />
                <BlogPageLayout.Content>
                    {
                        markdownBlocks.map((block, i) => (
                            <DevBlogContentBlock.MarkdownBlock {...block} key={i} />
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

function BlogHead({ blog }: { blog: ZaneDevBlog.Info }) {
    return (
        <StickyHero asChild>
            <BlogPageLayout.Layout style={{ background: "transparent", }}>
                <BlogPageLayout.Content style={{ margin: "auto" }}>
                    {/* Responsive Header */}
                    <T.H2 className={style.ShowOnMobile} asElement='h1'>{blog.title}</T.H2>
                    <T.H4 className={style.NoShowOnMobile} asElement='h1'>{blog.title}</T.H4>

                    <Spacer spacing="paragraph" />

                    {/* Responsive Discription */}
                    <T.H5 className={style.ShowOnMobile} asElement='h2' style={{ opacity: 0.75 }}>{blog.description}</T.H5>
                    <T.Body1 className={style.NoShowOnMobile} asElement='h2' style={{ opacity: 0.75 }}>{blog.description}</T.Body1>

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
        </StickyHero>
    )
}
