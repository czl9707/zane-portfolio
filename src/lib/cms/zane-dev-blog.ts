import * as UserToken from "@/lib/cms/user-token"
import { ImageInfo } from "@/lib/cms/common.type";

interface ZaneDevBlogInfo {
    title: string,
    subTitle: string,
    tags?: string[],
    createdDate: Date,
    description: string,
    cover: ImageInfo,
}

interface ZaneDevBlogDto {
    title: string,
    subTitle: string,
    tags?: string[],
    createdDate: number,
    description: string,
    cover: ImageInfo
}

export type {
    ZaneDevBlogInfo as Info,
    ZaneDevBlogDto as Dto,
}

const DEVBLOG_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneDevBlog`;

export async function getAll(): Promise<ZaneDevBlogInfo[]> {
    const user = await UserToken.get()

    return await fetch(
        `${DEVBLOG_ENDPOINT}`,
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

export function fromDto(dto: ZaneDevBlogDto): ZaneDevBlogInfo {
    return {
        title: dto.title as string,
        subTitle: dto.subTitle as string,
        tags: dto.tags ?? [],
        createdDate: new Date(dto.createdDate),
        description: dto.description,
        cover: dto.cover,
    }
}