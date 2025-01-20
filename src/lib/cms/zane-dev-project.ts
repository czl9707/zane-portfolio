import * as UserToken from "@/lib/cms/user-token"
import { ImageInfo } from "@/lib/cms/common.type";

interface ZaneDevProjectInfo {
    title: string,
    subTitle: string,
    tags?: string[],
    startDate: Date,
    endDate?: Date,
    description: string,
    cover: ImageInfo,
    externalLink: string,
}

interface ZaneDevProjectDto {
    title: string,
    subTitle: string,
    tags?: { value: string }[],
    startDate: number,
    endDate?: number,
    description: string,
    cover: ImageInfo,
    externalLink: string,
}

export type {
    ZaneDevProjectInfo as Info,
    ZaneDevProjectDto as Dto,
}

const DEVPROJECT_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneDevProject`;

export async function getAll(): Promise<ZaneDevProjectInfo[]> {
    const user = await UserToken.get()

    return await fetch(
        `${DEVPROJECT_ENDPOINT}`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => data.docs.map(fromDto)
    );
}

export function fromDto(dto: ZaneDevProjectDto): ZaneDevProjectInfo {
    return {
        title: dto.title as string,
        subTitle: dto.subTitle as string,
        tags: (dto.tags ?? []).map((t: { value: string }) => t.value),
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        description: dto.description,
        cover: dto.cover,
        externalLink: dto.externalLink,
    }
}