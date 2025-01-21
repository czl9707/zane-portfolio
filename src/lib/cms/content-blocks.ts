import { ImageInfo } from "@/lib/cms/common.type";

interface MultiImageBlockType {
    blockType: "multiImage",
    images: {
        image: ImageInfo,
        annotation?: string
    }[],
    catagory?: string,
}

interface ImageAndTextBlockType {
    blockType: "imageAndText",
    image: ImageInfo,
    title?: string,
    text: string,
    catagory?: string,
}

interface FullTextBlockType {
    blockType: "fullText",
    title?: string,
    text: string,
    catagory?: string,
}

interface FullSizeImageBlockType {
    blockType: "fullSizeImage",
    image: ImageInfo,
    catagory?: string,
}

type BlockType = MultiImageBlockType | ImageAndTextBlockType | FullTextBlockType | FullSizeImageBlockType;
export type {
    BlockType as Type,
    MultiImageBlockType,
    ImageAndTextBlockType,
    FullTextBlockType,
    FullSizeImageBlockType,
};

export function FromDtoToCatagories(blocks: BlockType[]): {
    catagory?: string,
    blocks: BlockType[]
}[] {
    const result: {
        catagory?: string,
        blocks: BlockType[]
    }[] = [];

    for (const block of blocks) {
        if (result.length === 0) {
            result.push({
                catagory: block.catagory,
                blocks: []
            })
            result[result.length - 1].blocks.push(block);
            continue;
        }

        if (result[result.length - 1].catagory === block.catagory || block.catagory === undefined) {
            result[result.length - 1].blocks.push(block);
        }
        else {
            result.push({
                catagory: block.catagory,
                blocks: []
            })
            result[result.length - 1].blocks.push(block);
        }
    }

    return result;
}
