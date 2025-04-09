import * as ContentBlock from '@/lib/cms/content-blocks'

import * as T from '@/components/ui/typography'
import * as SlideUp from '@/components/ui/slideup-effect'
import * as StyledMarkdown from '@/components/ui/styled-markdown'
import { CodePanel, CodeHighLighter } from '@/components/ui/code'

import React from 'react'
import { styled } from '@pigment-css/react'

const GridBase = styled(SlideUp.Grid)(({ theme }) => ({
    maxWidth: "54rem", width: "100%",
    marginBottom: theme.spacing.component,
}));

const Image = styled("img")(({ theme }) => ({
    width: "100%", objectFit: "cover", borderRadius: theme.size.border.radius,
    [`& + ${T.Body2}`]: {
        opacity: 0.75, textAlign: "center", marginTop: theme.spacing.paragraph
    }
}))


function MultiImageBlock({ block }: { block: ContentBlock.MultiImageBlockType }) {
    const maxRowItems = Math.ceil(block.images.length / block.rows)

    return (
        <GridBase columns={maxRowItems}>
            {
                block.images.map(image => (
                    <div style={{ gridColumn: "span 1 / span 1" }} key={image.image.alt}>
                        <Image src={image.image.url} alt={image.image.alt} />
                        {
                            image.annotation &&
                            <T.Body2>{image.annotation}</T.Body2>
                        }
                    </div>
                ))
            }
        </GridBase>
    )
}

function MarkdownBlock({ block }: { block: ContentBlock.MarkdownBlockType }) {
    return (
        <GridBase columns={1} style={{ rowGap: '0rem' }}>
            <StyledMarkdown.Default>
                {block.markdown}
            </StyledMarkdown.Default>
        </GridBase>
    )
}

function MultiCodeBlock({ block }: { block: ContentBlock.MultiCodeBlockType }) {
    return (
        <GridBase columns={1} style={{ rowGap: '0rem' }}>
            <CodePanel.Root defaultValue={block.codeBlocks[0].fileName}>
                <CodePanel.List>
                    {
                        block.codeBlocks.map(({ fileName }) => (
                            <CodePanel.Trigger value={fileName} key={fileName}>
                                {fileName}
                            </CodePanel.Trigger>
                        ))
                    }
                </CodePanel.List>
                {
                    block.codeBlocks.map(({ fileName, content, language }) => (
                        <CodePanel.Content tabName={fileName} key={fileName} copiableText={content}>
                            <CodeHighLighter language={language} content={content} />
                        </CodePanel.Content>
                    ))
                }
            </CodePanel.Root>
        </GridBase>
    )
}


export default function DevBlogContentBlock({ block }: { block: ContentBlock.DevBlogType }) {
    if (block.blockType === "multiImage") {
        return <MultiImageBlock block={block} />
    }
    if (block.blockType === "markdown") {
        return <MarkdownBlock block={block} />
    }
    if (block.blockType === "multiCodeBlock") {
        return <MultiCodeBlock block={block} />
    }
    else {
        throw new Error("invaid content block type encountered.")
    }
}