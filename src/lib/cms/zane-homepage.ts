import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import * as ZaneBlog from "@/lib/cms/zane-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

interface HomepageDto {
    whoAmI: string,
}

const GQL_QueryAll = `
query {
    ZaneHomepage {
        whoAmI
    }
}
`

export async function getContents() {
    const contentPromise: Promise<HomepageDto> = graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => (await req.json()).data["ZaneHomepage"]
    );

    const blogsPromise = ZaneBlog.getFeatured();
    const devProjectsPromise = ZaneDevProject.getFeatured();
    const archProjectsPromise = ZaneArchProject.getFeatured();

    return {
        featuredBlogs: await blogsPromise,
        featuredDevProjects: await devProjectsPromise,
        featuredArchProjects: await archProjectsPromise,
        whoAmI: (await contentPromise).whoAmI,
    };
}