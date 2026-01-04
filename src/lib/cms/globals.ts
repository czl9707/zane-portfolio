import { graphqlFetch } from "@/lib/cms/graphql-fetch";
import { HomepageDtoSchema, ZaneAboutMeSchema, CMSError } from "@/lib/cms/schemas";
import type { HomepageDto, ZaneAboutMe } from "@/lib/cms/schemas";
import { z } from "zod";

const GQL_QueryAll = `
query {
    ZaneHomepage {
        whoAmI
    }
}
`;

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
`;

/**
 * Fetches homepage content from the CMS.
 *
 * Retrieves the "Who Am I" introduction text displayed on the homepage.
 *
 * @returns Promise containing the homepage data with whoAmI field
 * @throws {CMSError} If the CMS request fails or data validation fails
 *
 * @example
 * ```typescript
 * const homepage = await getHomePage();
 * console.log(homepage.whoAmI); // "I'm a software engineer..."
 * ```
 */
export async function getHomePage(): Promise<HomepageDto> {
    try {
        const data = await graphqlFetch(GQL_QueryAll);

        // Validate response structure
        const responseSchema = z.object({
            ZaneHomepage: HomepageDtoSchema,
        });

        const validationResult = responseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new CMSError(
                "Invalid homepage data structure from CMS",
                validationResult.error
            );
        }

        return validationResult.data.ZaneHomepage;
    } catch (error) {
        if (error instanceof CMSError) {
            throw error;
        }
        throw new CMSError("Failed to fetch homepage data", error);
    }
}

/**
 * Fetches "About Me" content from the CMS.
 *
 * Retrieves personal information and timeline of experiences
 * displayed on the about page.
 *
 * @returns Promise containing about me data with description and timeline
 * @throws {CMSError} If the CMS request fails or data validation fails
 *
 * @example
 * ```typescript
 * const aboutMe = await getAboutMe();
 * console.log(aboutMe.aboutMe); // Bio text
 * console.log(aboutMe.timeline); // [{ year: [2020, 2022], experience: "..." }]
 * ```
 */
export async function getAboutMe(): Promise<ZaneAboutMe> {
    try {
        const data = await graphqlFetch(GQL_Aboutme);

        // Validate response structure
        const responseSchema = z.object({
            ZaneAboutMe: ZaneAboutMeSchema,
        });

        const validationResult = responseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new CMSError(
                "Invalid about me data structure from CMS",
                validationResult.error
            );
        }

        return validationResult.data.ZaneAboutMe;
    } catch (error) {
        if (error instanceof CMSError) {
            throw error;
        }
        throw new CMSError("Failed to fetch about me data", error);
    }
}