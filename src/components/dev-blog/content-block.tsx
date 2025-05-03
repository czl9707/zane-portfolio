import "server-only"

import * as ContentBlock from '@/lib/cms/content-blocks'
import * as SlideUp from '@/components/ui/slideup-effect'
import * as Markdown from '@/components/ui/markdown'
import * as SideCatagory from '@/components/layout/side-catagory'
import TitleSection from '@/components/layout/title-section'
import Spacer from '@/components/ui/spacer'
import Divider from '@/components/ui/divider'

import React from 'react'

import type { Root, RootContent } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { toMarkdown } from 'mdast-util-to-markdown';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

import style from './content-block.module.css';

const HeadingMajor = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function HeadingMajor({ id, ...others }, ref) {
        return (
            <>
                <Spacer spacing="component" />
                <SideCatagory.Link href={id == undefined ? "" : `#${id}`}>
                    <TitleSection.Heading ref={ref} id={id} {...others} />
                    <Spacer spacing="paragraph" />
                    <Divider />
                </SideCatagory.Link>
            </>
        )
    }
)

const HeadingMinor = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function HeadingMinor({ id, ...others }, ref) {
        return (
            <>
                <Spacer spacing="component" />
                <SideCatagory.Link href={id == undefined ? "" : `#${id}`}>
                    <TitleSection.SubHeading ref={ref} id={id} {...others} />
                    <Spacer spacing="paragraph" />
                    <Divider />
                </SideCatagory.Link>
            </>
        )
    }
)

export function MarkdownBlock({ markdown, hash }: {
    markdown: string,
    hash?: string,
}) {
    return (
        <SlideUp.Div className={style.ContentContainer}>
            <SideCatagory.Container hash={hash}>
                <Markdown.Default remarkPlugins={[appendIdToHeading]}
                    components={{
                        h1: HeadingMajor, h2: HeadingMajor, h3: HeadingMinor,
                        h4: HeadingMinor, h5: HeadingMinor, h6: HeadingMinor,
                    }}>
                    {markdown}
                </Markdown.Default>
            </SideCatagory.Container>
        </SlideUp.Div>
    )
}


export function toMarkdownBlocks(content: string): ({ markdown: string } & SideCatagory.CatagoryType)[] {
    const markdownProcessor = unified().use(remarkParse);
    const tree = markdownProcessor.parse(content);

    const result: ({ markdowns: RootContent[] } & SideCatagory.CatagoryType)[] = [];
    for (const child of tree.children) {
        if (child.type === "heading") {
            const catagory = toString(child);
            const hash = catagoryToHash(catagory);
            result.push({ depth: child.depth, displayName: catagory, hash: hash, markdowns: [child] })
        }
        else {
            if (result.length === 0) result.push({ markdowns: [], depth: 6 });
            result[result.length - 1].markdowns.push(child);
        }
    }

    const resultBlocks = result.map(rb => ({
        displayName: rb.displayName,
        hash: rb.hash,
        depth: rb.depth,
        markdown: toMarkdown({ type: "root", children: rb.markdowns })
    }));
    const minDepth = Math.min(...resultBlocks.map(b => b.depth));
    resultBlocks.forEach(b => b.depth -= minDepth);

    return resultBlocks;
}

function catagoryToHash(heading: string) {
    return heading.replaceAll(/[^\w]/g, "_").toLowerCase();
}

function appendIdToHeading() {
    return function (tree: Root) {
        for (const child of tree.children) {
            if (child.type === "heading") {
                const catagory = toString(child);
                const hash = catagoryToHash(catagory);

                child.data = child.data ?? {};
                child.data.hProperties = child.data.hProperties ?? {};
                child.data.hProperties.id = hash;
            }
        }
    }
}