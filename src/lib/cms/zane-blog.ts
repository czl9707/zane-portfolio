import {graphqlFetch} from "@/lib/cms/graphql-fetch"
import { ImageInfo } from "@/lib/cms/common.type";
import { cache } from "react";
import { RoleType } from "@/lib/constants";

interface ZaneBlogInfo {
    title: string,
    tags?: string[],
    id: string,
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
    id: string,
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
    id
    title
    tags
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

const GQL_QueryByRoleNId = `
query ZaneBlogByRoleNLink($id: String!) {
    ZaneBlog (id: $id) {
        content
        ...blogBase
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

async function getByRoleAndId(
    role: RoleType, 
    id: string
): Promise<ZaneBlogInfo> {
    return await graphqlFetch(
        GQL_QueryByRoleNId, { id, role }
    ).then(
        async req => await req.json()
    ).then(
        data => fromDto(data["data"]["ZaneBlog"])
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
        id: dto.id,
        role: dto.role,
        createdDate: new Date(dto.createdDate),
        lastUpdatedDate: new Date(dto.lastUpdatedDate),
        description: dto.description,
        cover: dto.cover,
        content: dto.content,
    }
}

const cached_getByRoleAndId = cache(getByRoleAndId);

export {
    getAll,
    getFeatured,
    getByTag,
    cached_getByRoleAndId as getByRoleAndId,
}