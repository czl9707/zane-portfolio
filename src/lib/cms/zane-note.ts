import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import { cache } from "react";
import type { RoleType } from "@/lib/constants";


interface ZaneNoteInfo {
    title: string,
    tags?: string[],
    id: string,
    role: RoleType
    lastUpdatedDate: Date,
    createdDate: Date,
    content: string,
}

interface ZaneNoteDto {
    title: string,
    tags?: string[],
    id: string,
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
    id
    title
    tags
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

const GQL_QueryByRoleNId = `
query ZaneNotesByRoleNLink($id: String!) {
    ZaneNotes ( id: $id ) {
        content
        ...noteBase
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

async function getByRoleAndId(
    role: RoleType, 
    id: string
): Promise<ZaneNoteInfo> {
    return await graphqlFetch(
        GQL_QueryByRoleNId, { id, role }
    ).then(
        async req => await req.json()
    ).then(
        data => fromDto(data["data"]["ZaneNote"])
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
        id: dto.id,
        role: dto.role,
        createdDate: new Date(dto.createdDate),
        lastUpdatedDate: new Date(dto.lastUpdatedDate),
        content: dto.content,
    }
}

const cached_getByRoleAndId = cache(getByRoleAndId);

export {
    getAll,
    getByTag,
    cached_getByRoleAndId as getByRoleAndId,
}