import * as UserToken from "@/lib/cms/user-token"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

const HOMEPAGE_ENDPOINT = `${process.env.ADMIN_URL}/api/globals/zaneHomepage`;

interface HomepageDto {
    featuredBlogs: { blog: { value: ZaneDevBlog.Dto } }[],
    featuredDevProjects: { project: { value: ZaneDevProject.Dto } }[],
    featuredArchProjects: { project: { value: ZaneArchProject.Dto } }[],
}

export async function getContents() {
    const user = await UserToken.get()
    const content: HomepageDto = await fetch(
        `${HOMEPAGE_ENDPOINT}`,
        {
            headers: {
                Authorization: `JWT ${user.token}`,
            }
        }
    ).then(
        async req => await req.json()
    );

    return {
        featuredBlogs: content.featuredBlogs.map(({ blog: { value } }) => ZaneDevBlog.fromDto(value)),
        featuredDevProjects: content.featuredDevProjects.map(({ project: { value } }) => ZaneDevProject.fromDto(value)),
        featuredArchProjects: content.featuredArchProjects.map(({ project: { value } }) => ZaneArchProject.fromDto(value)),
    }
}