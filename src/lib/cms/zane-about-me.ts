import {graphqlFetch} from "@/lib/cms/graphql-fetch"

interface ZaneAboutMe {
    aboutMe: string,
    timeline: { year: number[], experience: string }[],
}

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

export async function getContents(): Promise<ZaneAboutMe> {
    const content = await graphqlFetch(
        GQL_Aboutme
    ).then(
        async req => await req.json()
    );

    return content.data["ZaneAboutMe"];
}