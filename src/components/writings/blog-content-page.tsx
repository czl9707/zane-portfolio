import 'server-only'

import * as T from "@/components/ui/typography";
import * as BlogContentBlock from '@/components/writings/content-block';
import Divider from '@/components/ui/divider';
import Spacer from "@/components/ui/spacer";
import Chip from '@/components/ui/chip';
import * as SideCatagory from "@/components/layout/side-catagory"
import * as BlogPageLayout from "@/components/writings/page-layout";
import StickyHero from '@/components/layout/sticky-hero';

import * as ZaneBlog from '@/lib/cms/zane-blog'
import { DateAsString } from '@/lib/utils/date';
import { displayRole, type RoleType } from '@/lib/constants';

import React from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";

import style from './content-page.module.css';
import { themeVars } from '@/lib/theme';
import Link from 'next/link';

export async function generateStaticParams(): Promise<{ id: string, role: RoleType }[]> {
    const result = await ZaneBlog.getAll();
    return result.map(b => ({ id: b.id, role: b.role }));
}

export async function generateMetadata(role: RoleType, id: string): Promise<Metadata> {
    const blog = await ZaneBlog.getByRoleAndId(role, id);

    return {
        title: `Zane Chen - ${blog.title}`,
        description: blog.description,
    }
}

export async function Page({ id, role }: { id: string, role: RoleType }) {
    const blog = await ZaneBlog.getByRoleAndId(role, id).then(
        b => b,
        () => notFound(),
    );

    const markdownBlocks = BlogContentBlock.extractCatagories(blog.content);

    return (
        <SideCatagory.Context catagories={
            markdownBlocks.filter(b => b.hash != undefined)
        }>
            <BlogHead blog={blog} />
            <BlogPageLayout.Layout>
                <Divider style={{ gridColumn: "1 / -1" }} />
                <Spacer spacing="block" style={{ gridColumn: "1 / -1" }} />
                <BlogPageLayout.Content>
                    <BlogContentBlock.MarkdownBlocks markdown={blog.content} />
                </BlogPageLayout.Content>
                <BlogPageLayout.Catagory>
                    <T.H6 style={{ marginBottom: "1rem" }}>Table of Content</T.H6>
                    <SideCatagory.CatagoryPanel />
                </BlogPageLayout.Catagory>
            </BlogPageLayout.Layout>
        </SideCatagory.Context >
    )
}

function BlogHead({ blog }: { blog: ZaneBlog.Info }) {
    return (
        <StickyHero asChild>
            <BlogPageLayout.Layout style={{ background: "transparent", }}>
                <BlogPageLayout.Content style={{ margin: "auto" }}>
                    {/* Responsive Header */}
                    <T.H2 className={style.ShowOnMobile} asElement='h1'>{blog.title}</T.H2>
                    <T.H3 className={style.NoShowOnMobile} asElement='h1'>{blog.title}</T.H3>

                    <Spacer spacing="paragraph" />

                    {/* Responsive Discription */}
                    <T.H6 className={style.ShowOnMobile} asElement='h2' style={{ opacity: 0.75 }}>{blog.description}</T.H6>
                    <T.Body1 className={style.NoShowOnMobile} asElement='h2' style={{ opacity: 0.75 }}>{blog.description}</T.Body1>

                    <Chip.Container>
                        {
                            (blog.tags ?? []).map(tag => (
                                <Chip key={tag}>
                                    <Link href={`/writing/tag/${tag}`}>
                                        <T.Body1>#{tag}</T.Body1>
                                    </Link>
                                </Chip>
                            ))
                        }
                    </Chip.Container>
                    <Spacer spacing="component" />

                    <T.Body1 style={{ marginBottom: `var(${themeVars.spacing.component})` }}>
                        <span style={{ opacity: 0.75 }}>Created on </span>{DateAsString(blog.createdDate)}
                        <span style={{ opacity: 0.75 }}>, Last Updated on </span>{DateAsString(blog.lastUpdatedDate)}
                        <span style={{ opacity: 0.75 }}>, By a </span>{displayRole(blog.role)}
                        <br />
                    </T.Body1>
                </BlogPageLayout.Content>
                <BlogPageLayout.Catagory />
            </BlogPageLayout.Layout>
        </StickyHero>
    )
}
