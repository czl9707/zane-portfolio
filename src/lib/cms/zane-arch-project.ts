import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";
import * as Blocks from "@/lib/cms/content-blocks";
import { cache } from "react"

interface ZaneArchProjectInfo {
    title: string,
    subTitle: string,
    tags: string[],
    link: string,
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
    link: string,
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
    title
    subTitle
    tags
    link
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

const GQL_QueryByLink = `
query ZaneArchProjectsByLink($link: String!) {
    ZaneArchProjects (
        where: {
            link: { equals: $link }
        }
    ) {
    docs {
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

async function getByLink(link: string): Promise<ZaneArchProjectInfo> {
    return await graphqlFetch(
        GQL_QueryByLink, { link: link }
    ).then(
        async req => await req.json()
    ).then(
        data => {
            return fromDto(data["data"]["ZaneArchProjects"].docs[0])
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
        link: dto.link,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        location: dto.location,
        contributors: dto.contributors,
        description: dto.description,
        cover: dto.cover,
        content: dto.content ?? [],
    }
}

const cached_getByLink = cache(getByLink);

export {
    getFeatured,
    getAll,
    cached_getByLink as getByLink
}