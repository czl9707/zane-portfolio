import "server-only"

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
import { toString } from 'mdast-util-to-string';
// these will crash in dev mode ???
import { toMarkdown } from 'mdast-util-to-markdown';
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

const ContentContainer = styled(SlideUp.Div)(({ theme }) => ({
    maxWidth: "54rem", width: "100%",
    marginBottom: theme.spacing.component,
}));

export function MarkdownBlock({ markdown, hash }: {
    markdown: string,
    hash?: string,
}) {
    return (
        <ContentContainer>
            <SideCatagory.Container hash={hash}>
                <Markdown.Default remarkPlugins={[appendIdToHeading]}
                    components={{
                        h1: Heading, h2: Heading, h3: Heading,
                        h4: Heading, h5: Heading, h6: Heading,
                    }}>
                    {markdown}
                </Markdown.Default>
            </SideCatagory.Container>
        </ContentContainer>
    )
}




export async function toMarkdownBlocks(blocks: ContentBlock.DevBlogType[]): Promise<({ markdown: string } & SideCatagory.CatagoryType)[]> {
    const markdownDocuments = [];
    for (const block of blocks) {
        if (block.blockType === "markdown") {
            markdownDocuments.push(block.markdown);
        }
        else if (block.blockType === "multiImage") {
            for (const image of block.images) {
                markdownDocuments.push(`![${image.image.alt}](${image.image.url})`);
            }
        }
    }

    // const { toMarkdown } = (await import('mdast-util-to-markdown'));
    // const remarkParse = (await import('remark-parse')).default;
    // const { unified } = await import('unified');

    const markdownProcessor = unified().use(remarkParse);
    const tree = markdownProcessor.parse(markdownDocuments.join("\n"));

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
                const catagory = "toString(child)";
                const hash = catagoryToHash(catagory);

                child.data = child.data ?? {};
                child.data.hProperties = child.data.hProperties ?? {};
                child.data.hProperties.id = hash;
            }
        }
    }
}