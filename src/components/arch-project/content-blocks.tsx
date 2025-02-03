/* eslint-disable @next/next/no-img-element */
import * as ContentBlock from '@/lib/cms/content-blocks'

import * as T from '@/components/ui/typography'
import * as SlideUp from '@/components/ui/slideup-effect'
import * as Grid from '@/components/ui/grid'
import StyledMarkdown from '../ui/styled-markdown'

const PADDING_TEMPLATE = "max-w-7xl w-full mx-auto"

function MultiImageBlock({ block }: { block: ContentBlock.MultiImageBlockType }) {
    const maxRowItems = Math.ceil(block.images.length / block.rows)
    const ContainerType = maxRowItems == 1 ? "div" : (
        maxRowItems == 2 ? Grid.ColTwo : (
            maxRowItems == 3 ? Grid.ColThree :
                Grid.ColFour
        ));

    return <SlideUp.FullWidth className="my-group">
        <ContainerType className={`${PADDING_TEMPLATE}`}>
            {
                block.images.map(image => (
                    <div className='col-span-1' key={image.image.alt}>
                        <img src={image.image.url} alt={image.image.alt}
                            className="object-cover mb-paragraph rounded" />
                        <T.Body2 className='text-foreground/75 text-center'>
                            {image.annotation}
                        </T.Body2>
                    </div>
                ))
            }
        </ContainerType>
    </SlideUp.FullWidth>
}

function ImageAndTextBlock({ block }: { block: ContentBlock.ImageAndTextBlockType }) {
    return (
        <SlideUp.FullWidth className="my-group">
            <Grid.ColTwo className={`${PADDING_TEMPLATE}`}>
                <div className='col-span-1 relative'>
                    <T.H5 className="text-foreground/75 pb-paragraph">{block.title}</T.H5>
                    <div className='w-3/4'>
                        <StyledMarkdown>
                            {block.text}
                        </StyledMarkdown>
                    </div>
                </div>
                <div className='col-span-1 relative'>
                    <img src={block.image.url} alt={block.image.alt}
                        className='w-full object-cover rounded' />
                </div>
            </Grid.ColTwo>
        </SlideUp.FullWidth>
    )
}

function FullTextBlock({ block }: { block: ContentBlock.FullTextBlockType }) {
    return (
        <SlideUp.FullWidth className="my-group">
            <Grid.ColFour className={PADDING_TEMPLATE}>
                <div className='col-span-1'>
                    <T.H5 className="text-foreground/75">{block.title}</T.H5>
                </div>
                <span className='col-span-1' />
                <div className='col-span-2'>
                    <StyledMarkdown>
                        {block.text}
                    </StyledMarkdown>
                </div>
            </Grid.ColFour>
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