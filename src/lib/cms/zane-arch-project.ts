import { graphqlFetch } from "@/lib/cms/graphql-fetch";
import { ZaneArchProjectDtoSchema, CMSError } from "@/lib/cms/schemas";
import type { ZaneArchProjectDto, ImageInfo, ArchProjectBlock } from "@/lib/cms/schemas";
import { z } from "zod";

/**
 * Transformed architecture project data with Date objects instead of timestamps
 */
interface ZaneArchProjectInfo {
    title: string;
    subTitle: string;
    featured: boolean;
    tags: string[];
    id: string;
    startDate: Date;
    endDate?: Date;
    location?: string;
    contributors?: string;
    description: string;
    cover: ImageInfo;
    content: { blocks: ArchProjectBlock[]; catagory: string[]; visible: boolean }[];
}

const zaneArchProjectBaseFragment = `
fragment zaneArchProjectBase on ZaneArchProject {
    id
    title
    subTitle
    featured
    tags
    startDate
    endDate
    location
    featured
    contributors
    description
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
    ZaneArchProjects {
        docs { id }
    }
}
`;

const GQL_QueryById = `
query ZaneArchProjectsByLink($id: String!) {
    ZaneArchProject (id: $id) {
        ...zaneArchProjectBase
      	content {
            catagory
            visible
            blocks {
                ... on MultiImage { ...multiImageFrag }
                ... on ImageAndText { ...imageAndTextFrag }
                ... on FullText { ...fullTextFrag }
                ... on FullSizeImage { ...fullSizeImageFrag }
            }
        }
    }
}

fragment multiImageFrag on MultiImage {
  images { 
    image {...imageInfo }
    annotation
  }
  rows
  blockType
}

fragment imageAndTextFrag on ImageAndText {
    blockType
    image { ...imageInfo }
    title
    text
    annotation
}

fragment fullTextFrag on FullText {
    blockType
    title
    text
}

fragment fullSizeImageFrag on FullSizeImage {
    blockType
    image { ...imageInfo }
}

fragment imageInfo on Media {
    url
    width
    height
    alt
}

${zaneArchProjectBaseFragment}
`;

/**
 * Fetches all architecture project IDs from the CMS.
 *
 * Retrieves a list of project IDs that can be used to fetch
 * full project details via getById(). Used by Astro's content
 * collections loader to generate static pages.
 *
 * @returns Promise containing array of project ID strings
 * @throws {CMSError} If the CMS request fails or data validation fails
 *
 * @example
 * ```typescript
 * const projectIds = await getAll();
 * // ["project-1", "project-2", ...]
 * ```
 */
async function getAll(): Promise<string[]> {
    try {
        const data = await graphqlFetch(GQL_QueryAll);

        // Validate response structure
        const responseSchema = z.object({
            ZaneArchProjects: z.object({
                docs: z.array(z.object({ id: z.string() })),
            }),
        });

        const validationResult = responseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new CMSError(
                "Invalid architecture projects list data structure from CMS",
                validationResult.error
            );
        }

        return validationResult.data.ZaneArchProjects.docs.map((d) => d.id);
    } catch (error) {
        if (error instanceof CMSError) {
            throw error;
        }
        throw new CMSError("Failed to fetch architecture project IDs", error);
    }
}

/**
 * Fetches a single architecture project by ID from the CMS.
 *
 * Retrieves complete project details including content blocks,
 * images, descriptions, and metadata. Used to populate individual
 * architecture project pages.
 *
 * @param id - The unique identifier of the project to fetch
 * @returns Promise containing the complete project information
 * @throws {CMSError} If the CMS request fails, project not found, or data validation fails
 *
 * @example
 * ```typescript
 * const project = await getById("residential-tower-2023");
 * console.log(project.title, project.content);
 * ```
 */
async function getById(id: string): Promise<ZaneArchProjectInfo> {
    try {
        const data = await graphqlFetch(GQL_QueryById, { id });

        // Validate response structure
        const responseSchema = z.object({
            ZaneArchProject: ZaneArchProjectDtoSchema.nullable(),
        });

        const validationResult = responseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new CMSError(
                `Invalid architecture project data structure from CMS for project ID: ${id}`,
                validationResult.error
            );
        }

        const projectData = validationResult.data.ZaneArchProject;
        if (projectData === null) {
            throw new CMSError(
                `Architecture project not found: ${id}`,
                undefined,
                404
            );
        }

        return fromDto(projectData);
    } catch (error) {
        if (error instanceof CMSError) {
            throw error;
        }
        throw new CMSError(`Failed to fetch architecture project: ${id}`, error);
    }
}

/**
 * Transforms an architecture project DTO from the CMS into the internal format.
 *
 * Converts timestamp numbers to Date objects and ensures optional fields
 * have default values (empty arrays for tags/content).
 *
 * @param dto - The raw architecture project data from CMS
 * @returns Transformed project data with Date objects
 */
function fromDto(dto: ZaneArchProjectDto): ZaneArchProjectInfo {
    return {
        title: dto.title,
        subTitle: dto.subTitle,
        tags: dto.tags ?? [],
        featured: dto.featured,
        id: dto.id,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        location: dto.location,
        contributors: dto.contributors,
        description: dto.description,
        cover: dto.cover,
        content: dto.content ?? [],
    };
}

export {
    getAll,
    getById
}