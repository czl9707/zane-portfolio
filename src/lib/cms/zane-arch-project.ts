import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";
import * as Blocks from "@/lib/cms/content-blocks";
import { cache } from "react"

interface ZaneArchProjectInfo {
    title: string,
    subTitle: string,
    tags: string[],
    id: string,
    startDate: Date,
    endDate?: Date,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
    content: { blocks: Blocks.ArchProjectType[], catagory: string[], visible: boolean }[],
}

interface ZaneArchProjectDto {
    title: string,
    subTitle: string,
    tags?: string[],
    id: string,
    startDate: number,
    endDate?: number,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
    content?: { blocks: Blocks.ArchProjectType[], catagory: string[], visible: boolean }[],
}

export type {
    ZaneArchProjectInfo as Info,
    ZaneArchProjectDto as Dto,
}

const zaneArchProjectBaseFragment = `
fragment zaneArchProjectBase on ZaneArchProject {
    id
    title
    subTitle
    tags
    startDate
    endDate
    location
    contributors
    description
    cover {
        url
        width
        height
        alt
    }
}
`;

const GQL_QueryAll = `
query {
    ZaneArchProjects {
        docs { ...zaneArchProjectBase }
    }
}

${zaneArchProjectBaseFragment}
`;

const GQL_QueryFeatured = `
query {
    ZaneArchProjects (
        where: {
            featured: {
                equals: true
            }
        }
    ) {
        docs { ...zaneArchProjectBase }
    }
}

${zaneArchProjectBaseFragment}
`;

const GQL_QueryById = `
query ZaneArchProjectsByLink($id: String!) {
    ZaneArchProject (id: $id) {
        ...zaneArchProjectBase
      	content {
            catagory
            visible
            blocks {
                ... on MultiImage { ...multiImageFrag }
                ... on ImageAndText { ...imageAndTextFrag }
                ... on FullText { ...fullTextFrag }
                ... on FullSizeImage { ...fullSizeImageFrag }
            }
        }
    }
}

fragment multiImageFrag on MultiImage {
  images { 
    image {...imageInfo }
    annotation
  }
  rows
  blockType
}

fragment imageAndTextFrag on ImageAndText {
    blockType
    image { ...imageInfo }
    title
    text
    annotation
}

fragment fullTextFrag on FullText {
    blockType
    title
    text
}

fragment fullSizeImageFrag on FullSizeImage {
    blockType
    image { ...imageInfo }
}

fragment imageInfo on Media {
    url
    width
    height
    alt
}

${zaneArchProjectBaseFragment}
`;

async function getAll(): Promise<ZaneArchProjectInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(

        data => data["data"]["ZaneArchProjects"].docs.map(fromDto)
    );
}

async function getById(id: string): Promise<ZaneArchProjectInfo> {
    return await graphqlFetch(
        GQL_QueryById, { id }
    ).then(
        async req => await req.json()
    ).then(
        data => {
            return fromDto(data["data"]["ZaneArchProject"])
        }
    );
}

async function getFeatured(): Promise<ZaneArchProjectInfo[]> {
    return await graphqlFetch(
        GQL_QueryFeatured
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneArchProjects"].docs.map(fromDto)
    );
}

function fromDto(dto: ZaneArchProjectDto): ZaneArchProjectInfo {
    return {
        title: dto.title as string,
        subTitle: dto.subTitle as string,
        tags: dto.tags ?? [],
        id: dto.id,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        location: dto.location,
        contributors: dto.contributors,
        description: dto.description,
        cover: dto.cover,
        content: dto.content ?? [],
    }
}

const cached_getById = cache(getById);

export {
    getFeatured,
    getAll,
    cached_getById as getById
}