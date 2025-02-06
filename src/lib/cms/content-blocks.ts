import { ImageInfo } from "@/lib/cms/common.type";

interface MultiImageBlockType {
    blockType: "multiImage",
    images: {
        image: ImageInfo,
        annotation?: string
    }[],
    catagory?: string,
    rows: number,
}

interface ImageAndTextBlockType {
    blockType: "imageAndText",
    image: ImageInfo,
    title?: string,
    text: string,
    catagory?: string,
    annotation?: string
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