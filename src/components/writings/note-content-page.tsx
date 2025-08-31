import 'server-only'

import * as T from "@/components/ui/typography";
import * as BlogContentBlock from '@/components/writings/content-block';
import Spacer from "@/components/ui/spacer";
import Chip from '@/components/ui/chip';
import * as SideCatagory from "@/components/layout/side-catagory"
import * as BlogPageLayout from "@/components/writings/page-layout";

import * as ZaneNote from '@/lib/cms/zane-note'
import { DateAsString } from '@/lib/utils/date';
import { displayRole, type RoleType } from '@/lib/constants';

import React from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";

import style from './content-page.module.css';

export async function generateStaticParams(): Promise<{ id: string, role: RoleType }[]> {
    const result = await ZaneNote.getAll();
    return result.map(b => ({ id: b.id, role: b.role }));
}

export async function generateMetadata(role: RoleType, id: string): Promise<Metadata> {
    const note = await ZaneNote.getByRoleAndId(role, id);

    return {
        title: `Zane Chen - ${note.title}`,
        description: `Zane's note on ${note.title}`,
    }
}

export async function Page({ id, role }: { id: string, role: RoleType }) {
    const note = await ZaneNote.getByRoleAndId(role, id).then(
        n => n,
        () => notFound(),
    );

    const markdownBlocks = BlogContentBlock.toMarkdownBlocks(note.content);

    return (
        <SideCatagory.Context catagories={
            markdownBlocks
                .filter(b => b.hash != undefined)
                .map(doc => ({ ...doc, markdown: undefined }))
        }>
            <NoteHead note={note} />
            <BlogPageLayout.Layout>
                <Spacer spacing="group" style={{ gridColumn: "1 / -1" }} />
                <BlogPageLayout.Content>
                    {
                        markdownBlocks.map((block, i) => (
                            <React.Fragment key={i}>
                                {i != 0 && <Spacer spacing="component" />}
                                <BlogContentBlock.MarkdownBlock {...block} />
                            </React.Fragment>                        ))
                    }
                </BlogPageLayout.Content>
                <BlogPageLayout.Catagory>
                    <T.H6 style={{ marginBottom: "1rem" }}>Table of Content</T.H6>
                    <SideCatagory.CatagoryPanel/>
                </BlogPageLayout.Catagory>
            </BlogPageLayout.Layout>
        </SideCatagory.Context >
    )
}

function NoteHead({ note }: { note: ZaneNote.Info }) {
    return (
        <BlogPageLayout.Layout style={{ background: "transparent", }}>
            <BlogPageLayout.Content style={{ margin: "auto" }}>
                <Spacer spacing="block" />

                <T.H2 className={style.ShowOnMobile} asElement='h1'>{note.title}</T.H2>
                <T.H4 className={style.NoShowOnMobile} asElement='h1'>{note.title}</T.H4>

                <Chip.Container>
                    {
                        (note.tags ?? []).map(t => (
                            <Chip key={t}><T.Body1>#{t}</T.Body1></Chip>
                        ))
                    }
                </Chip.Container>
                <Spacer spacing="component" />

                <T.Body1>
                    <span style={{ opacity: 0.75 }}>Created on </span>{DateAsString(note.createdDate)}
                    <span style={{ opacity: 0.75 }}>, Last Updated on </span>{DateAsString(note.lastUpdatedDate)}
                    <span style={{ opacity: 0.75 }}>, By a </span>{displayRole(note.role)}
                    <br />
                </T.Body1>
            </BlogPageLayout.Content>
        </BlogPageLayout.Layout>
    )
}
