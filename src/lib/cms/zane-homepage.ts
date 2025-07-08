import { graphqlFetch } from "@/lib/cms/graphql-fetch"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

interface HomepageDto {
    featuredBlogs: { value: ZaneDevBlog.Dto }[],
    featuredDevProjects: { value: ZaneDevProject.Dto }[],
    featuredArchProjects: { value: ZaneArchProject.Dto }[],
    whoAmI: string,
}

const GQL_QueryAll = `
query {
    ZaneHomepage {
        whoAmI
        featuredBlogs {
            value {
                ... on ZaneDevBlog {
                    title
                    tags
                    link
                    createdDate
                    description
                    cover { ... ImageInfo }
                }
            }
        }
        featuredDevProjects {
            value {
                ... on ZaneDevProject {
                    title
                    startDate
                    endDate
                    description
                    externalLink
                    cover { ... ImageInfo }
                }
            }
        }
        featuredArchProjects {
            value {
                ... on ZaneArchProject {
                    title
                    subTitle
                    tags
                    link
                    startDate
                    endDate
                    location
                    contributors
                    description
                    cover { ... ImageInfo }
                }
            }
        }
    }
}

fragment ImageInfo on Media {
      url
    width
    height
    alt
}
`

export async function getContents() {
    const content: HomepageDto = await graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => (await req.json()).data["ZaneHomepage"]
    );
    console.log(content)

    return {
        featuredBlogs: content.featuredBlogs.map(blog => ZaneDevBlog.fromDto(blog.value)),
        featuredDevProjects: content.featuredDevProjects.map(project => ZaneDevProject.fromDto(project.value)),
        featuredArchProjects: content.featuredArchProjects.map(project => ZaneArchProject.fromDto(project.value)),
        whoAmI: content.whoAmI,
    };
}