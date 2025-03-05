import * as UserToken from "@/lib/cms/user-token"
import { ImageInfo } from "@/lib/cms/common.type";
import * as Blocks from "@/lib/cms/content-blocks";


interface ZaneDevBlogInfo {
    title: string,
    subTitle: string,
    tags?: string[],
    createdDate: Date,
    description: string,
    cover: ImageInfo,
    content: { blocks: Blocks.DevBlogType[], catagory: string[], visible: boolean }[],
}

interface ZaneDevBlogDto {
    title: string,
    subTitle: string,
    tags?: string[],
    createdDate: number,
    description: string,
    cover: ImageInfo,
    content: { blocks: Blocks.DevBlogType[], catagory: string[], visible: boolean }[],
}

export type {
    ZaneDevBlogInfo as Info,
    ZaneDevBlogDto as Dto,
}

const DEVBLOG_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneDevBlog`;

export async function getAll(): Promise<ZaneDevBlogInfo[]> {
    const user = await UserToken.get()

    return await fetch(
        `${DEVBLOG_ENDPOINT}?select[content]=false`,
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

export async function getByTitle(title: string): Promise<ZaneDevBlogInfo> {
    const user = await UserToken.get()

    return await fetch(
        `${DEVBLOG_ENDPOINT}?where[title][equals]=${title}`,
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

export function fromDto(dto: ZaneDevBlogDto): ZaneDevBlogInfo {
    return {
        title: dto.title as string,
        subTitle: dto.subTitle as string,
        tags: dto.tags ?? [],
        createdDate: new Date(dto.createdDate),
        description: dto.description,
        cover: dto.cover,
        content: dto.content,
    }
}