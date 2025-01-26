import * as UserToken from "@/lib/cms/user-token"
import { ImageInfo } from "@/lib/cms/common.type";
import * as Blocks from "@/lib/cms/content-blocks";

interface ZaneArchProjectInfo {
    title: string,
    subTitle: string,
    tags: string[],
    startDate: Date,
    endDate?: Date,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
    content: { blocks: Blocks.Type[], catagory?: string }[],
}

interface ZaneArchProjectDto {
    title: string,
    subTitle: string,
    tags?: { value: string }[],
    startDate: number,
    endDate?: number,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
    content?: Blocks.Type[]
}

export type {
    ZaneArchProjectInfo as Info,
    ZaneArchProjectDto as Dto,
}

const ARCHPROJECT_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneArchProject`;

export async function getAll(): Promise<ZaneArchProjectInfo[]> {
    const user = await UserToken.get()

    return await fetch(
        `${ARCHPROJECT_ENDPOINT}?select[content]=false`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => data.docs.map((d: ZaneArchProjectDto) => fromDto(d))
    );
}

export async function getByTitle(title: string): Promise<ZaneArchProjectInfo> {
    const user = await UserToken.get()

    return await fetch(
        `${ARCHPROJECT_ENDPOINT}?where[title][equals]=${title}`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
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
        tags: (dto.tags ?? []).map((t: { value: string }) => t.value),
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        location: dto.location,
        contributors: dto.contributors,
        description: dto.description,
        cover: dto.cover,
        content: dto.content === undefined ? [] :
            Blocks.FromDtoToCatagories(dto.content),
    }
}