import * as UserToken from "@/lib/cms/user-token"

const HOMEPAGE_ENDPOINT = `${process.env.ADMIN_URL}/api/globals/zaneAboutMe`;

interface ZaneAboutMe {
    aboutMe: string,
    timeline: { year: number[], experience: string }[],
}

export async function getContents() {
    const user = await UserToken.get()
    const content: ZaneAboutMe = await fetch(
        `${HOMEPAGE_ENDPOINT}`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
            }
        }
    ).then(
        async req => await req.json()
    );

    return content;
}