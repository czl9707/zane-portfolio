import * as ApiKey from "@/lib/cms/apikey"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

const HOMEPAGE_ENDPOINT = `${process.env.ADMIN_URL}/api/globals/zaneHomepage`;

interface HomepageDto {
    featuredBlogs: { value: ZaneDevBlog.Dto }[],
    featuredDevProjects: { value: ZaneDevProject.Dto }[],
    featuredArchProjects: { value: ZaneArchProject.Dto }[],
    whoAmI: string,
}

export async function getContents() {
    const apikey = await ApiKey.get()
    const content: HomepageDto = await fetch(
        `${HOMEPAGE_ENDPOINT}`,
        {
            headers: {
                Authorization: `users API-Key ${apikey}`,
            }
        }
    ).then(
        async req => await req.json()
    );

    return {
        featuredBlogs: content.featuredBlogs.map(blog => ZaneDevBlog.fromDto(blog.value)),
        featuredDevProjects: content.featuredDevProjects.map(project => ZaneDevProject.fromDto(project.value)),
        featuredArchProjects: content.featuredArchProjects.map(project => ZaneArchProject.fromDto(project.value)),
        whoAmI: content.whoAmI,
    };
}