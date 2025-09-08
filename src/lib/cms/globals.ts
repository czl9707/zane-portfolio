import { graphqlFetch } from "@/lib/cms/graphql-fetch"

interface HomepageDto {
    whoAmI: string,
}

interface ZaneAboutMe {
    aboutMe: string,
    timeline: { year: number[], experience: string }[],
}

const GQL_QueryAll = `
query {
    ZaneHomepage {
        whoAmI
    }
}
`

const GQL_Aboutme = `
query {
  ZaneAboutMe {
    aboutMe
    timeline {
      year
      experience
    }
  }
}
`

export async function getHomePage() {
    const contentPromise: Promise<HomepageDto> = graphqlFetch(
        GQL_QueryAll
    ).then(
        async req => (await req.json()).data["ZaneHomepage"]
    );

    return {
        whoAmI: (await contentPromise).whoAmI,
    };
}


export async function getAboutMe(): Promise<ZaneAboutMe> {
    const content = await graphqlFetch(
        GQL_Aboutme
    ).then(
        async req => await req.json()
    );

    return content.data["ZaneAboutMe"];
}