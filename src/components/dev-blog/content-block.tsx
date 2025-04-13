import * as ContentBlock from '@/lib/cms/content-blocks'

import * as SlideUp from '@/components/ui/slideup-effect'
import * as Markdown from '@/components/ui/markdown'
import * as SideCatagory from '@/components/layout/side-catagory'
import TitleSection from '@/components/layout/title-section'
import Spacer from '@/components/ui/spacer'
import Divider from '@/components/ui/divider'


import React from 'react'
import { styled } from '@pigment-css/react'

import type { Root, RootContent } from 'mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { unified } from 'unified';


const Heading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function Heading({ id, ...others }, ref) {
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

const GridBase = styled(SlideUp.Div)(({ theme }) => ({
    maxWidth: "54rem", width: "100%",
    marginBottom: theme.spacing.component,
}));

export function MarkdownBlock({ markdown, hash }: {
    markdown: string,
    hash?: string,
}) {
    return (
        <GridBase>
            <SideCatagory.Container hash={hash}>
                <Markdown.Default remarkPlugins={[appendIdToHeading]}
                    components={{
                        h1: Heading, h2: Heading, h3: Heading,
                        h4: Heading, h5: Heading, h6: Heading,
                    }}>
                    {markdown}
                </Markdown.Default>
            </SideCatagory.Container>
        </GridBase>
    )
}

export function ToMarkdownBlocks(blocks: ContentBlock.DevBlogType[]): ({ markdown: string } & SideCatagory.CatagoryType)[] {
    const markdownDocuments = [];
    for (const block of blocks) {
        if (block.blockType === "markdown") {
            markdownDocuments.push(block.markdown);
        }
        else if (block.blockType === "multiImage") {
            for (const image of block.images) {
                markdownDocuments.push(`![${image.image.alt}](${image.image.url})`)
            }
        }
    }

    const processor = unified().use(remarkParse);
    const tree = processor.parse(markdownDocuments.join("\n"));

    const result: ({ markdowns: RootContent[] } & SideCatagory.CatagoryType)[] = [];
    for (const child of tree.children) {
        if (child.type === "heading") {
            const catagory = toString(child);
            const hash = catagoryToHash(catagory);
            result.push({ depth: child.depth, displayName: catagory, hash: hash, markdowns: [child] })
        }
        else {
            if (result.length === 0) result.push({ markdowns: [], depth: 1 });
            result[result.length - 1].markdowns.push(child);
        }
    }

    const resultBlocks = result.map(r => ({
        displayName: r.displayName,
        hash: r.hash,
        depth: r.depth,
        markdown: toMarkdown({ type: "root", children: r.markdowns })
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