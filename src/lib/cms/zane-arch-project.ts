import * as UserToken from "@/lib/cms/user-token"
import { ImageInfo } from "@/lib/cms/common.type";

const ARCHPROJECT_ENDPOINT = `${process.env.ADMIN_URL}/api/zaneArchProject`;

export interface ArchProjectInfo {
    title: string,
    subTitle: string,
    tags: string[],
    startDate: Date,
    endDate: Date,
    location: string,
    contributors: string,
    description: string,
    cover: ImageInfo,
}

interface ArchProjectInfoDto {
    title: string,
    subTitle: string,
    tags: { value: string }[],
    startDate: number,
    endDate: number,
    location: string,
    contributors: string,
    description: string,
    cover: ImageInfo
}


export async function getAll(): Promise<ArchProjectInfo[]> {
    const user = await UserToken.get()

    return await fetch(
        `${ARCHPROJECT_ENDPOINT}`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => data.docs.map((doc: ArchProjectInfoDto) => {
            return {
                title: doc.title as string,
                subTitle: doc.subTitle as string,
                tags: doc.tags.map((t: { value: string }) => t.value),
                startDate: new Date(doc.startDate),
                endDate: new Date(doc.endDate),
                location: doc.location,
                contributors: doc.contributors,
                description: doc.description,
                cover: doc.cover,
            }
        })
    );
}