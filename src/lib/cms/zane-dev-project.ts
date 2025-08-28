import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";

interface ZaneDevProjectInfo {
    title: string,
    tags?: string[],
    startDate: Date,
    endDate?: Date,
    description: string,
    externalLink: string,
    cover: ImageInfo,
}

interface ZaneDevProjectDto {
    title: string,
    tags?: string[],
    startDate: number,
    endDate?: number,
    description: string,
    externalLink: string,
    cover: ImageInfo,
}

export type {
    ZaneDevProjectInfo as Info,
    ZaneDevProjectDto as Dto,
}

const zaneDevProjectBaseFragment = `
fragment zaneDevProjectBase on ZaneDevProject {
    title
    tags
    startDate
    endDate
    description
    externalLink
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
    ZaneDevProjects {
        docs { ...zaneDevProjectBase }
    }
}

${zaneDevProjectBaseFragment}
`;

const GQL_QueryFeatured = `
query {
    ZaneDevProjects (
        where: {
            featured: { equals: true }
        }
    ) {
        docs { ...zaneDevProjectBase }
    }
}

${zaneDevProjectBaseFragment}
`;



export async function getAll(): Promise<ZaneDevProjectInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(
        data => data.data["ZaneDevProjects"].docs.map(fromDto)
    );
}

export async function getFeatured(): Promise<ZaneDevProjectInfo[]> {
    return await graphqlFetch(
        GQL_QueryFeatured
    ).then(
        async req => await req.json()
    ).then(
        data => data.data["ZaneDevProjects"].docs.map(fromDto)
    );
}

function fromDto(dto: ZaneDevProjectDto): ZaneDevProjectInfo {
    return {
        title: dto.title as string,
        tags: dto.tags ?? [],
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        description: dto.description,
        cover: dto.cover,
        externalLink: dto.externalLink,
    }
}