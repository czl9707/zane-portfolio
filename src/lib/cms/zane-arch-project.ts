import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import type { ImageInfo, Block } from "./common.type";

interface ZaneArchProjectInfo {
    title: string,
    subTitle: string,
    featured: boolean,
    tags: string[],
    id: string,
    startDate: Date,
    endDate?: Date,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
    content: { blocks: Block.ArchProjectBlockType[], catagory: string[], visible: boolean }[],
}

interface ZaneArchProjectDto {
    title: string,
    subTitle: string,
    featured: boolean,
    tags?: string[],
    id: string,
    startDate: number,
    endDate?: number,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
    content?: { blocks: Block.ArchProjectBlockType[], catagory: string[], visible: boolean }[],
}

const zaneArchProjectBaseFragment = `
fragment zaneArchProjectBase on ZaneArchProject {
    id
    title
    subTitle
    featured
    tags
    startDate
    endDate
    location
    featured
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
        docs { id }
    }
}
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

async function getAll(): Promise<string[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneArchProjects"].docs.map(
            (d: {id:string}) => d.id
        )
    );
}

async function getById(id: string): Promise<ZaneArchProjectInfo> {
    return await graphqlFetch(
        GQL_QueryById, { id }
    ).then(
        async req => await req.json()
    ).then(
        data => {
            if (data["data"]["ZaneArchProject"] == null)
                throw new Error("Not Found");
            return fromDto(data["data"]["ZaneArchProject"])
        }
    );
}

function fromDto(dto: ZaneArchProjectDto): ZaneArchProjectInfo {
    return {
        title: dto.title as string,
        subTitle: dto.subTitle as string,
        tags: dto.tags ?? [],
        featured: dto.featured,
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

export {
    getAll,
    getById
}