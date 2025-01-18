import * as UserToken from "@/lib/cms/user-token"
import { ImageInfo } from "@/lib/cms/common.type";

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
    cover: ImageInfo
}

export type {
    ZaneArchProjectInfo as Info,
    ZaneArchProjectDto as Dto,
}

const ARCHPROJECT_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneArchProject`;

export async function getAllTitle(): Promise<string[]> {
    const user = await UserToken.get()

    return await fetch(
        `${ARCHPROJECT_ENDPOINT}?select[title]=true`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => {
            return data.docs.map((d: { title: string }) => d.title);
        }
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
        data => {
            return fromDto(data.docs[0]);
        }
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
    }
}