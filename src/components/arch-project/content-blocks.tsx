/* eslint-disable @next/next/no-img-element */
import * as ContentBlock from '@/lib/cms/content-blocks'

import * as T from '@/components/ui/typography'
import * as SlideUp from '@/components/ui/slideup-effect'
import Grid from '@/components/ui/grid'
import * as Markdown from '@/components/ui/markdown'
import Spacer from '@/components/ui/spacer'

import * as React from 'react'

import style from './content-blocks.module.css';
import clsx from 'clsx'

const Image = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
    function Image({ className, ...others }, ref) {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img {...others} ref={ref} className={clsx(className, style.Image)} />
    }
)

const GridBase = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { columns: number }>(
    function GridBase({ className, ...others }, ref) {
        return (
            <Grid className={clsx(className, style.GridBase)} ref={ref} {...others} />
        )
    }
)

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
                    <div className={style.ShrinkOnMD}>
                        <Markdown.Default>
                            {block.text}
                        </Markdown.Default>
                    </div>
                </div>
                <div style={{ gridColumn: "span 1" }}>
                    <Image src={block.image.url} alt={block.image.alt} style={{ width: "100%" }} />
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
            <Image src={block.image.url} alt={block.image.alt} style={{ width: "100%" }} />
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