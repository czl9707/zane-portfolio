import * as ApiKey from "@/lib/cms/graphql-fetch"

const HOMEPAGE_ENDPOINT = `${process.env.ADMIN_URL}/api/globals/zaneAboutMe`;

interface ZaneAboutMe {
    aboutMe: string,
    timeline: { year: number[], experience: string }[],
}

export async function getContents() {
    const apikey = await ApiKey.get();
    const content: ZaneAboutMe = await fetch(
        `${HOMEPAGE_ENDPOINT}`,
        {
            headers: {
                Authorization: `users API-Key ${apikey}`,
            }
        }
    ).then(
        async req => await req.json()
    );

    return content;
}