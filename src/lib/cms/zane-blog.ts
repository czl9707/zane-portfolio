import {graphqlFetch} from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";
import { cache } from "react";

type RoleType = "developer" | "humanBeing";

interface ZaneBlogInfo {
    title: string,
    tags?: string[],
    link: string,
    role: RoleType
    lastUpdatedDate: Date,
    createdDate: Date,
    description: string,
    cover: ImageInfo,
    content: string,
}

interface ZaneBlogDto {
    title: string,
    tags?: string[],
    link: string,
    role: RoleType
    createdDate: number,
    lastUpdatedDate: number,
    description: string,
    cover: ImageInfo,
    content: string,
}

export type {
    ZaneBlogInfo as Info,
    ZaneBlogDto as Dto,
}


const imageFragment = `
fragment imageInfo on Media {
    url
    width
    height
    alt
}`;

const blogBaseFrament = `
fragment blogBase on ZaneBlog {
    title
    tags
    link
    role
    createdDate
    lastUpdatedDate
    description
    cover { ...imageInfo }
}
    
${imageFragment}
`;

const GQL_QueryAll = `
query {
    ZaneBlogs {
        docs { ...blogBase }
    }
}

${blogBaseFrament}
`;

const GQL_QueryByRoleNLink = `
query ZaneBlogByRoleNLink($link: String!, $role: ZaneBlog_role_Input!) {
    ZaneBlogs (
        where: {
            link: { equals: $link }
            role: { equals: $role }
        }
    ) {
        docs {
            content
            ...blogBase
        }
    }
}

${blogBaseFrament}
`;


const GQL_QueryFeatured = `
query {
    ZaneBlogs (
        where: {
            featured: { equals: true }
        }
    ) {
        docs { ...blogBase }
    }
}
    
${blogBaseFrament}
`;

const GQL_QueryByTag = `
query ZaneBlogByTag($tag: String!){
    ZaneBlogs (
        where: {
            tags: { contains: $tag }
        }
    ) {
        docs { ...blogBase }
    }
}
    
${blogBaseFrament}
`;

async function getAll(): Promise<ZaneBlogInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneBlogs"].docs.map(fromDto)
    );
}

async function getByRoleAndLink(
    role: RoleType, 
    link: string
): Promise<ZaneBlogInfo> {
    return await graphqlFetch(
        GQL_QueryByRoleNLink, { link, role }
    ).then(
        async req => await req.json()
    ).then(
        data => fromDto(data["data"]["ZaneBlogs"].docs[0])
    );
}

async function getByTag(
    tag: string
): Promise<ZaneBlogInfo[]> {
    return await graphqlFetch(
        GQL_QueryByTag, { tag }
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneBlogs"].docs.map(fromDto)
    );
}

async function getFeatured(): Promise<ZaneBlogInfo[]> {
    return await graphqlFetch(
        GQL_QueryFeatured
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneBlogs"].docs.map(fromDto)
    );
}

function fromDto(dto: ZaneBlogDto): ZaneBlogInfo {
    return {
        title: dto.title as string,
        tags: dto.tags ?? [],
        link: dto.link,
        role: dto.role,
        createdDate: new Date(dto.createdDate),
        lastUpdatedDate: new Date(dto.lastUpdatedDate),
        description: dto.description,
        cover: dto.cover,
        content: dto.content,
    }
}

const cached_getByRoleAndLink = cache(getByRoleAndLink);

export {
    getAll,
    getFeatured,
    getByTag,
    cached_getByRoleAndLink as getByRoleAndLink,
}