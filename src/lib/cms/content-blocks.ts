import { ImageInfo } from "@/lib/cms/common.type";

interface MultiImageBlockType {
    blockType: "multiImage",
    images: {
        image: ImageInfo,
        annotation?: string
    }[],
    rows: number,
}

interface ImageAndTextBlockType {
    blockType: "imageAndText",
    image: ImageInfo,
    title?: string,
    text: string,
    annotation?: string
}

interface FullTextBlockType {
    blockType: "fullText",
    title?: string,
    text: string,
}

interface FullSizeImageBlockType {
    blockType: "fullSizeImage",
    image: ImageInfo,
}

interface MarkdownBlockType {
    blockType: "markdown",
    markdown: string,
}


type ArchProjectBlockType = MultiImageBlockType | ImageAndTextBlockType | FullTextBlockType | FullSizeImageBlockType;
type DevBlogBlockType = MultiImageBlockType | MarkdownBlockType;

export type {
    ArchProjectBlockType as ArchProjectType,
    DevBlogBlockType as DevBlogType,
    MultiImageBlockType,
    ImageAndTextBlockType,
    FullTextBlockType,
    FullSizeImageBlockType,
    MarkdownBlockType,
};