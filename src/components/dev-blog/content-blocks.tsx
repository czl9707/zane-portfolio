import * as ContentBlock from '@/lib/cms/content-blocks'

import * as T from '@/components/ui/typography'
import Grid from '@/components/ui/grid'
import * as StyledMarkdown from '@/components/ui/styled-markdown'

import React from 'react'
import { styled } from '@pigment-css/react'

const GridBase = styled(Grid)(({ theme }) => ({
    maxWidth: "54rem", width: "100%", marginLeft: "auto", marginRight: "auto",
    marginTop: theme.spacing.group, marginBottom: theme.spacing.group
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
        <GridBase columns={1} >
            <StyledMarkdown.Default>
                {block.markdown}
            </StyledMarkdown.Default>
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
    else {
        throw new Error("invaid content block type encountered.")
    }
}