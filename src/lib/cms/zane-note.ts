import {graphqlFetch} from "@/lib/cms/graphql-fetch"
import { cache } from "react";

type RoleType = "developer" | "humanBeing";

interface ZaneNoteInfo {
    title: string,
    tags?: string[],
    link: string,
    role: RoleType
    lastUpdatedDate: Date,
    createdDate: Date,
    content: string,
}

interface ZaneNoteDto {
    title: string,
    tags?: string[],
    link: string,
    role: RoleType
    createdDate: number,
    lastUpdatedDate: number,
    content: string,
}

export type {
    ZaneNoteInfo as Info,
    ZaneNoteDto as Dto,
}


const noteBaseFrament = `
fragment noteBase on ZaneNote {
    title
    tags
    link
    role
    createdDate
    lastUpdatedDate
}`;

const GQL_QueryAll = `
query {
    ZaneNotes {
        docs { ...noteBase }
    }
}

${noteBaseFrament}
`;

const GQL_QueryByRoleNLink = `
query ZaneNotesByRoleNLink($link: String!, $role: ZaneNote_role_Input!) {
    ZaneNotes (
        where: {
            link: { equals: $link }
            role: { equals: $role }
        }
    ) {
        docs {
            content
            ...noteBase
        }
    }
}

${noteBaseFrament}
`;

const GQL_QueryByTag = `
query ZaneNoteByTag($tag: String!){
    ZaneNotes (
        where: {
            tags: { contains: $tag }
        }
    ) {
        docs { ...noteBase }
    }
}
    
${noteBaseFrament}
`;

async function getAll(): Promise<ZaneNoteInfo[]> {
    return await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneNotes"].docs.map(fromDto)
    );
}

async function getByRoleAndLink(
    role: RoleType, 
    link: string
): Promise<ZaneNoteInfo> {
    return await graphqlFetch(
        GQL_QueryByRoleNLink, { link, role }
    ).then(
        async req => await req.json()
    ).then(
        data => fromDto(data["data"]["ZaneNotes"].docs[0])
    );
}

async function getByTag(
    tag: string
): Promise<ZaneNoteInfo[]> {
    return await graphqlFetch(
        GQL_QueryByTag, { tag }
    ).then(
        async req => await req.json()
    ).then(
        data => data["data"]["ZaneNotes"].docs.map(fromDto)
    );
}

function fromDto(dto: ZaneNoteDto): ZaneNoteInfo {
    return {
        title: dto.title as string,
        tags: dto.tags ?? [],
        link: dto.link,
        role: dto.role,
        createdDate: new Date(dto.createdDate),
        lastUpdatedDate: new Date(dto.lastUpdatedDate),
        content: dto.content,
    }
}

const cached_getByRoleAndLink = cache(getByRoleAndLink);

export {
    getAll,
    getByTag,
    cached_getByRoleAndLink as getByRoleAndLink,
}