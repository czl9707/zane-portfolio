import * as ContentBlock from '@/lib/cms/content-blocks'

import * as T from '@/components/ui/typography'
import * as SlideUp from '@/components/ui/slideup-effect'
import Grid from '@/components/ui/grid'
import * as Markdown from '@/components/ui/markdown'
import Spacer from '@/components/ui/spacer'

import React from 'react'
import { styled, css } from '@pigment-css/react'

const GridBase = styled(Grid)(({ theme }) => ({
    maxWidth: "72rem", width: "100%", marginLeft: "auto", marginRight: "auto",
    marginTop: theme.spacing.group, marginBottom: theme.spacing.group
}));

const Image = styled("img")(({ theme }) => ({
    width: "100%", objectFit: "cover", borderRadius: theme.size.border.radius,
    [`& + ${T.Body2}`]: {
        opacity: 0.75, textAlign: "center", marginTop: theme.spacing.paragraph
    }
}))

const FullSizeImage = styled(Image)({ width: "100%" });

function MultiImageBlock({ block }: { block: ContentBlock.MultiImageBlockType }) {
    const maxRowItems = Math.ceil(block.images.length / block.rows)

    return <SlideUp.FullWidth>
        <GridBase columns={maxRowItems}>
            {
                block.images.map(image => (
                    <div style={{ gridColumn: "span 1" }} key={image.image.alt}>
                        <Image src={image.image.url} alt={image.image.alt} />
                        {
                            image.annotation &&
                            <T.Body2>{image.annotation}</T.Body2>
                        }
                    </div>
                ))
            }
        </GridBase>
    </SlideUp.FullWidth>
}

function ImageAndTextBlock({ block }: { block: ContentBlock.ImageAndTextBlockType }) {
    return (
        <SlideUp.FullWidth>
            <GridBase columns={2}>
                <div style={{ gridColumn: "span 1" }}>
                    <T.H5 style={{ opacity: 0.75 }}>{block.title}</T.H5>
                    <Spacer spacing="paragraph" />
                    <div className={css(({ theme }) => ({ [`@media(min-width: ${theme.breakpoint.md})`]: { width: "85%" } }))}>
                        <Markdown.Default>
                            {block.text}
                        </Markdown.Default>
                    </div>
                </div>
                <div style={{ gridColumn: "span 1" }}>
                    <FullSizeImage src={block.image.url} alt={block.image.alt} />
                    {
                        block.annotation &&
                        <T.Body2>{block.annotation}</T.Body2>
                    }
                </div>
            </GridBase>
        </SlideUp.FullWidth >
    )
}

function FullTextBlock({ block }: { block: ContentBlock.FullTextBlockType }) {
    return (
        <SlideUp.FullWidth>
            <GridBase columns={4} >
                <div style={{ gridColumn: "span 1" }}>
                    <T.H5 style={{ opacity: 0.75 }}>{block.title}</T.H5>
                </div>
                <span style={{ gridColumn: "span 1" }} />
                <div style={{ gridColumn: "span 2 / span 2" }}>
                    <Markdown.Default>
                        {block.text}
                    </Markdown.Default>
                </div>
            </GridBase>
        </SlideUp.FullWidth>
    )
}


function FullSizeImageBlock({ block }: { block: ContentBlock.FullSizeImageBlockType }) {
    return (
        <SlideUp.FullWidth>
            <Spacer />
            <FullSizeImage src={block.image.url} alt={block.image.alt} />
            <Spacer />
        </SlideUp.FullWidth>
    )
}


export default function ArchProjectContentBlock({ block }: { block: ContentBlock.ArchProjectType }) {
    if (block.blockType === "fullSizeImage") {
        return <FullSizeImageBlock block={block} />
    }
    else if (block.blockType === "fullText") {
        return <FullTextBlock block={block} />
    }
    else if (block.blockType === "imageAndText") {
        return <ImageAndTextBlock block={block} />
    }
    else if (block.blockType === "multiImage") {
        return <MultiImageBlock block={block} />
    }
    else {
        throw new Error("invaid content block type encountered.")
    }
}