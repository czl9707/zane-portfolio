import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import type { ImageInfo } from "@/lib/cms/common.type";

interface ZaneDevProjectInfo {
    title: string,
    tags: string[],
    featured: boolean,
    startDate: Date,
    endDate?: Date,
    description: string,
    externalLink: string,
    cover: ImageInfo,
}

interface ZaneDevProjectDto {
    title: string,
    tags?: string[],
    featured: boolean,
    startDate: number,
    endDate?: number,
    description: string,
    externalLink: string,
    cover: ImageInfo,
}

const zaneDevProjectBaseFragment = `
fragment zaneDevProjectBase on ZaneDevProject {
    title
    tags
    featured
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




export async function getAll(): Promise<ZaneDevProjectInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
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
        featured: dto.featured,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        description: dto.description,
        cover: dto.cover,
        externalLink: dto.externalLink,
    }
}