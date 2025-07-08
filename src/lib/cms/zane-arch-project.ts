import * as ApiKey from "@/lib/cms/graphql-fetch"
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

const ARCHPROJECT_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneArchProject`;

export async function getAll(): Promise<ZaneArchProjectInfo[]> {
    const apikey = await ApiKey.get()

    return await fetch(
        `${ARCHPROJECT_ENDPOINT}?select[content]=false`,
        {
            headers: {
                Authorization: `users API-Key ${apikey}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => data.docs.map(fromDto)
    );
}

export async function getByLink(link: string): Promise<ZaneArchProjectInfo> {
    const apikey = await ApiKey.get()

    return await fetch(
        `${ARCHPROJECT_ENDPOINT}?where[link][equals]=${link}`,
        {
            headers: {
                Authorization: `users API-Key ${apikey}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => fromDto(data.docs[0])
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