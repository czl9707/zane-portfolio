import { graphqlFetch } from "@/lib/cms/graphql-fetch";
import { ZaneDevProjectDtoSchema, CMSError } from "@/lib/cms/schemas";
import type { ZaneDevProjectDto, ImageInfo } from "@/lib/cms/schemas";
import { z } from "zod";

/**
 * Transformed developer project data with Date objects instead of timestamps
 */
interface ZaneDevProjectInfo {
    title: string;
    tags: string[];
    featured: boolean;
    startDate: Date;
    endDate?: Date;
    description: string;
    externalLink: string;
    cover: ImageInfo;
}

const zaneDevProjectBaseFragment = `
fragment zaneDevProjectBase on ZaneDevProject {
    title
    tags
    featured
    startDate
    endDate
    description
    externalLink
    cover {
        url
        width
        height
        alt
    }
}
`;

const GQL_QueryAll = `
query {
    ZaneDevProjects {
        docs { ...zaneDevProjectBase }
    }
}

${zaneDevProjectBaseFragment}
`;

/**
 * Fetches all developer projects from the CMS.
 *
 * Retrieves a list of software development projects with metadata
 * including title, description, tags, and cover images. Used to
 * populate the developer projects page.
 *
 * @returns Promise containing array of developer project information
 * @throws {CMSError} If the CMS request fails or data validation fails
 *
 * @example
 * ```typescript
 * const projects = await getAll();
 * projects.forEach(p => console.log(p.title, p.externalLink));
 * ```
 */
export async function getAll(): Promise<ZaneDevProjectInfo[]> {
    try {
        const data = await graphqlFetch(GQL_QueryAll);

        // Validate response structure
        const responseSchema = z.object({
            ZaneDevProjects: z.object({
                docs: z.array(ZaneDevProjectDtoSchema),
            }),
        });

        const validationResult = responseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new CMSError(
                "Invalid developer projects data structure from CMS",
                validationResult.error
            );
        }

        const projects = validationResult.data.ZaneDevProjects.docs;
        return projects.map(fromDto);
    } catch (error) {
        if (error instanceof CMSError) {
            throw error;
        }
        throw new CMSError("Failed to fetch developer projects", error);
    }
}

/**
 * Transforms a developer project DTO from the CMS into the internal format.
 *
 * Converts timestamp numbers to Date objects and ensures tags array exists.
 *
 * @param dto - The raw developer project data from CMS
 * @returns Transformed project data with Date objects
 */
function fromDto(dto: ZaneDevProjectDto): ZaneDevProjectInfo {
    return {
        title: dto.title,
        tags: dto.tags ?? [],
        featured: dto.featured,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        description: dto.description,
        cover: dto.cover,
        externalLink: dto.externalLink,
    };
}