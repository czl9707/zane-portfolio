import * as ApiKey from "@/lib/cms/apikey"
import { ImageInfo } from "@/lib/cms/common.type";


interface ZaneDevBlogInfo {
    title: string,
    subTitle: string,
    tags?: string[],
    link: string,
    createdDate: Date,
    description: string,
    cover: ImageInfo,
    content: string,
}

interface ZaneDevBlogDto {
    title: string,
    subTitle: string,
    tags?: string[],
    link: string,
    createdDate: number,
    description: string,
    cover: ImageInfo,
    content: string,
}

export type {
    ZaneDevBlogInfo as Info,
    ZaneDevBlogDto as Dto,
}

const DEVBLOG_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneDevBlog`;

export async function getAll(): Promise<ZaneDevBlogInfo[]> {
    const apikey = await ApiKey.get();

    return await fetch(
        `${DEVBLOG_ENDPOINT}?select[content]=false`,
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

export async function getByLink(link: string): Promise<ZaneDevBlogInfo> {
    const apikey = await ApiKey.get()

    return await fetch(
        `${DEVBLOG_ENDPOINT}?where[link][equals]=${link}`,
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

export function fromDto(dto: ZaneDevBlogDto): ZaneDevBlogInfo {
    return {
        title: dto.title as string,
        subTitle: dto.subTitle as string,
        tags: dto.tags ?? [],
        link: dto.link,
        createdDate: new Date(dto.createdDate),
        description: dto.description,
        cover: dto.cover,
        content: dto.content,
    }
}