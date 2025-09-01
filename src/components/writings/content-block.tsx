import "server-only"

import * as Markdown from '@/components/ui/markdown'
import * as T from '@/components/ui/typography'
import * as SideCatagory from '@/components/layout/side-catagory'
import Spacer from '@/components/ui/spacer'
import Divider from '@/components/ui/divider'
import HeadingWithTag from "@/components/ui/heading-with-tag"
import React from 'react'

import type { Root as HastRoot, Element as HastElement } from 'hast';
import { toString as mdToString } from 'mdast-util-to-string';
import { toString as htmlToString } from 'hast-util-to-string';
import remarkParse from 'remark-parse';
import remarkMath from "remark-math"
import rehypeMathjax from "rehype-mathjax"
import remarkGfm from "remark-gfm"
import { unified } from 'unified';

import style from './content-block.module.css';
import clsx from "clsx"

const HeadingMajor = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function HeadingMajor({ id, className, children, ...others }, ref) {
        return (
            <>
                <SideCatagory.Link href={id == undefined ? "" : `#${id}`}>
                    <HeadingWithTag>
                        <T.H4 {...others} ref={ref} id={id} className={className}>{children}</T.H4>
                    </HeadingWithTag>
                    <Spacer spacing="paragraph" />
                    <Divider />
                </SideCatagory.Link>
            </>
        )
    }
)

const HeadingMinor = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function HeadingMinor({ id, className, children, ...others }, ref) {
        return (
            <>
                <SideCatagory.Link href={id == undefined ? "" : `#${id}`}>
                    <HeadingWithTag>
                        <T.H5 {...others} ref={ref} id={id} className={className}>{children}</T.H5>
                    </HeadingWithTag>
                    <Spacer spacing="paragraph" />
                    <Divider />
                </SideCatagory.Link>
            </>
        )
    }
)

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { hash: string }>(
    function Section({ children, hash, className, ...others }, ref) {
        return <SideCatagory.Container hash={hash} className={clsx(style.ContentContainer, className)} {...others} ref={ref}>
            {children}
        </SideCatagory.Container>
    }
);

export function MarkdownBlocks({ markdown }: { markdown: string, }) {
    return (
        <Markdown.Default
            remarkPlugins={[[remarkGfm, { firstLineBlank: true }], remarkMath]}
            rehypePlugins={[rehypeMathjax, catagorizeBlocks]}
            remarkRehypeOptions={{}}
            components={{
                h1: HeadingMajor, h2: HeadingMajor, h3: HeadingMinor,
                h4: HeadingMinor, h5: HeadingMinor, h6: HeadingMinor,
                section: Section as React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>,
            }}>
            {markdown}
        </Markdown.Default>
    )
}


export function extractCatagories(content: string): (SideCatagory.CatagoryType)[] {
    const markdownProcessor = unified().use(remarkParse).use(remarkGfm);
    const tree = markdownProcessor.parse(content);

    const result: SideCatagory.CatagoryType[] = [];
    for (const child of tree.children) {
        if (child.type === "heading") {
            const catagory = mdToString(child);
            result.push({ depth: child.depth, displayName: catagory, hash: catagory })
        }
    }

    const minDepth = Math.min(...result.map(b => b.depth));
    result.forEach(b => b.depth -= minDepth);

    return result;
}

function catagorizeBlocks() {
    return function(tree: HastRoot) {
        const sections: HastElement[] = [];

        for (const child of tree.children) {
            if (child.type === "element" && child.tagName === "section") {
                sections.push(child as HastElement);
            } 
            else if (child.type === "element" && child.tagName.match(/^h[1-6]$/)) {
                const catagory = htmlToString(child);
                child.properties = child.properties ?? {};
                child.properties.id = catagory;
                
                sections.push({ type: "element", tagName: "section", properties: { hash: catagory }, children: [child] });
            }
            else {
                if (sections.length === 0) {
                    sections.push({ type: "element", tagName: "section", properties: {}, children: [child as HastElement] });
                }
                else {
                    sections[sections.length - 1].children.push(child as HastElement);
                }
            }
        }

        tree.children = sections;
        return tree;
    }
}
