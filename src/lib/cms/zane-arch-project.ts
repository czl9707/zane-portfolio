import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";
import * as Blocks from "@/lib/cms/content-blocks";

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

const GQL_QueryAll = `
query {
    ZaneArchProjects {
        docs {
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
    }
}
`;
const GQL_QueryByLink = `
query ZaneArchProjectsByLink($link: String!) {
    ZaneArchProjects (
        where: {
            link: {
                equals: $link
            }
        }
    ) {
    docs {
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
      	content {
          catagory
          visible
          blocks {
            ... on MultiImage { ...MultiImageFrag }
            ... on ImageAndText { ...ImageAndTextFrag }
            ... on FullText { ...FullTextFrag }
            ... on FullSizeImage { ...FullSizeImageFrag }
          }
        }
    }
  }
}

fragment MultiImageFrag on MultiImage {
  images { 
    image {...ImageInfo }
    annotation
  }
  rows
  blockType
}

fragment ImageAndTextFrag on ImageAndText {
    blockType
    image { ...ImageInfo }
    title
    text
    annotation
}

fragment FullTextFrag on FullText {
    blockType
    title
    text
}

fragment FullSizeImageFrag on FullSizeImage {
    blockType
    image { ...ImageInfo }
}

fragment ImageInfo on Media {
    url
    width
    height
    alt
}
`;

export async function getAll(): Promise<ZaneArchProjectInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(
        
        data => data["data"]["ZaneArchProjects"].docs.map(fromDto)
    );
}

export async function getByLink(link: string): Promise<ZaneArchProjectInfo> {
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

export function fromDto(dto: ZaneArchProjectDto): ZaneArchProjectInfo {
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