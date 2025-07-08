import {graphqlFetch} from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";


interface ZaneDevBlogInfo {
    title: string,
    tags?: string[],
    link: string,
    createdDate: Date,
    description: string,
    cover: ImageInfo,
    content: string,
}

interface ZaneDevBlogDto {
    title: string,
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

const GQL_QueryAll = `
query {
    ZaneDevBlogs {
        docs {
            title
            tags
            link
            createdDate
            description
            cover {
                url
                width
                height
                alt
            }
        }
    }
}`;

const GQL_QueryByLink = `
query {
    ZaneDevBlogs (
        where: {
            link: {
                equals: $link
            }
        }
    ) {
    docs {
        title
        tags
        link
        createdDate
        description
        cover {
            url
            width
            height
            alt
        }
    }
  }
}`;

export async function getAll(): Promise<ZaneDevBlogInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneDevBlogs"].docs.map(fromDto)
    );
}

export async function getByLink(link: string): Promise<ZaneDevBlogInfo> {
    return await graphqlFetch(
        GQL_QueryByLink, { link }
    ).then(
        async req => await req.json()
    ).then(
        data => fromDto(data["data"]["ZaneDevBlogs"].docs[0])
    );
}

export function fromDto(dto: ZaneDevBlogDto): ZaneDevBlogInfo {
    return {
        title: dto.title as string,
        tags: dto.tags ?? [],
        link: dto.link,
        createdDate: new Date(dto.createdDate),
        description: dto.description,
        cover: dto.cover,
        content: dto.content,
    }
}