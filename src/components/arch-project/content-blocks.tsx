/* eslint-disable @next/next/no-img-element */
import * as ContentBlock from '@/lib/cms/content-blocks'

// import * as Container from '@/components/ui/container'
import * as T from '@/components/ui/typography'
import * as SlideUp from '@/components/ui/slideup-effect'
import * as Grid from '@/components/ui/grid'
import StyledMarkdown from '../ui/styled-markdown'

const PADDING_TEMPLATE = "max-w-7xl w-full mx-auto"

function MultiImageBlock({ block }: { block: ContentBlock.MultiImageBlockType }) {
    return <SlideUp.FullWidth className="my-36">
        <div className={`col-span-3 flex flex-row gap-4 ${PADDING_TEMPLATE}`}>
            {
                block.images.map(image => (
                    <div className='flex-1' key={image.image.alt}>
                        <img src={image.image.url} alt={image.image.alt}
                            className="object-cover mb-4 rounded" />
                        <T.Body2 className='text-foreground/75'>
                            {image.annotation}
                        </T.Body2>
                    </div>
                ))
            }
        </div>
    </SlideUp.FullWidth>
}

function ImageAndTextBlock({ block }: { block: ContentBlock.ImageAndTextBlockType }) {
    return (
        <SlideUp.FullWidth className="my-36">
            <Grid.ColThree className={PADDING_TEMPLATE}>
                <div className='col-span-1'>
                    <T.H5 className="text-foreground/75 mb-4">{block.title}</T.H5>
                    <div >
                        <StyledMarkdown>
                            {block.text}
                        </StyledMarkdown>
                    </div>
                </div>
                <div className='col-span-2 relative'>
                    <img src={block.image.url} alt={block.image.alt}
                        className='w-full object-cover rounded' />
                </div>
            </Grid.ColThree>
        </SlideUp.FullWidth>
    )
}

function FullTextBlock({ block }: { block: ContentBlock.FullTextBlockType }) {
    return (
        <SlideUp.FullWidth className="my-36">
            <Grid.ColThree className={PADDING_TEMPLATE}>
                <div className='col-span-1'>
                    <T.H5 className="text-foreground/75">{block.title}</T.H5>
                </div>
                <div className='col-span-2'>
                    <StyledMarkdown>
                        {block.text}
                    </StyledMarkdown>
                </div>
            </Grid.ColThree>
        </SlideUp.FullWidth>
    )
}

function FullSizeImageBlock({ block }: { block: ContentBlock.FullSizeImageBlockType }) {
    return (
        <SlideUp.FullWidth className='my-36'>
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