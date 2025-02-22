/* eslint-disable @next/next/no-img-element */
import * as ContentBlock from '@/lib/cms/content-blocks'

import * as T from '@/components/ui/typography'
import * as SlideUp from '@/components/ui/slideup-effect'
import Grid from '@/components/ui/grid'
import * as StyledMarkdown from '../ui/styled-markdown'

import React from 'react'
import { styled } from '@pigment-css/react'

const GridBase = styled(Grid)({
    maxWidth: "80rem", width: "100%", marginLeft: "auto", marginRight: "auto",
});

function MultiImageBlock({ block }: { block: ContentBlock.MultiImageBlockType }) {
    const maxRowItems = Math.ceil(block.images.length / block.rows)

    return <SlideUp.FullWidth className="my-group">
        <GridBase columns={maxRowItems}>
            {
                block.images.map(image => (
                    <div className='col-span-1' key={image.image.alt}>
                        <img src={image.image.url} alt={image.image.alt}
                            className="object-cover rounded" />
                        {
                            image.annotation &&
                            <T.Body2 className='text-foreground/75 text-center mt-paragraph'>
                                {image.annotation}
                            </T.Body2>
                        }
                    </div>
                ))
            }
        </GridBase>
    </SlideUp.FullWidth>
}

function ImageAndTextBlock({ block }: { block: ContentBlock.ImageAndTextBlockType }) {
    return (
        <SlideUp.FullWidth className="my-group">
            <GridBase columns={2}>
                <div className='col-span-1 relative'>
                    <T.H5 className="text-foreground/75 pb-paragraph">{block.title}</T.H5>
                    <div className='w-3/4'>
                        <StyledMarkdown.Default>
                            {block.text}
                        </StyledMarkdown.Default>
                    </div>
                </div>
                <div className='col-span-1 relative'>
                    <img src={block.image.url} alt={block.image.alt}
                        className='w-full object-cover rounded' />
                    {
                        block.annotation &&
                        <T.Body2 className='text-foreground/75 text-center mt-paragraph'>
                            {block.annotation}
                        </T.Body2>
                    }
                </div>
            </GridBase>
        </SlideUp.FullWidth>
    )
}

function FullTextBlock({ block }: { block: ContentBlock.FullTextBlockType }) {
    return (
        <SlideUp.FullWidth className="my-group">
            <GridBase columns={4} >
                <div className='col-span-1'>
                    <T.H5 className="text-foreground/75">{block.title}</T.H5>
                </div>
                <span className='col-span-1' />
                <div className='col-span-2'>
                    <StyledMarkdown.Default>
                        {block.text}
                    </StyledMarkdown.Default>
                </div>
            </GridBase>
        </SlideUp.FullWidth>
    )
}

function FullSizeImageBlock({ block }: { block: ContentBlock.FullSizeImageBlockType }) {
    return (
        <SlideUp.FullWidth className='my-group'>
            <img src={block.image.url} alt={block.image.alt}
                className='w-full object-cover rounded' />
        </SlideUp.FullWidth>
    )
}


export default function ArchProjectContentBlock({ block }: { block: ContentBlock.Type }) {
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