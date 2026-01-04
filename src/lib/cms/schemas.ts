import { z } from "zod";

/**
 * Zod schemas for validating data from the GraphQL CMS.
 * These schemas ensure type safety and provide runtime validation
 * for all data fetched from the external CMS API.
 */

/**
 * Schema for image information returned from CMS
 */
export const ImageInfoSchema = z.object({
    url: z.string().url("Invalid image URL"),
    width: z.number().positive("Image width must be positive"),
    height: z.number().positive("Image height must be positive"),
    alt: z.string(),
});

export type ImageInfo = z.infer<typeof ImageInfoSchema>;

/**
 * Schema for MultiImage block type
 */
export const MultiImageBlockSchema = z.object({
    blockType: z.literal("multiImage"),
    images: z.array(
        z.object({
            image: ImageInfoSchema,
            annotation: z.string().nullable().optional(),
        })
    ),
    rows: z.number().int().positive(),
});

/**
 * Schema for ImageAndText block type
 */
export const ImageAndTextBlockSchema = z.object({
    blockType: z.literal("imageAndText"),
    image: ImageInfoSchema,
    title: z.string().nullable().optional(),
    text: z.string(),
    annotation: z.string().nullable().optional(),
});

/**
 * Schema for FullText block type
 */
export const FullTextBlockSchema = z.object({
    blockType: z.literal("fullText"),
    title: z.string().nullable().optional(),
    text: z.string(),
});

/**
 * Schema for FullSizeImage block type
 */
export const FullSizeImageBlockSchema = z.object({
    blockType: z.literal("fullSizeImage"),
    image: ImageInfoSchema,
    annotation: z.string().nullable().optional(),
});

/**
 * Union schema for all architecture project block types
 */
export const ArchProjectBlockSchema = z.discriminatedUnion("blockType", [
    MultiImageBlockSchema,
    ImageAndTextBlockSchema,
    FullTextBlockSchema,
    FullSizeImageBlockSchema,
]);

export type ArchProjectBlock = z.infer<typeof ArchProjectBlockSchema>;

/**
 * Schema for architecture project content sections
 */
export const ArchProjectContentSchema = z.object({
    catagory: z.array(z.string()),
    visible: z.boolean(),
    blocks: z.array(ArchProjectBlockSchema),
});

/**
 * Schema for architecture project DTO from GraphQL API
 * Note: Dates can be either strings (ISO format) or numbers (timestamps)
 */
export const ZaneArchProjectDtoSchema = z.object({
    id: z.string(),
    title: z.string(),
    subTitle: z.string(),
    featured: z.boolean(),
    tags: z.array(z.string()).optional(),
    startDate: z.union([z.string(), z.number()]).transform(val =>
        typeof val === 'string' ? new Date(val).getTime() : val
    ),
    endDate: z.union([z.string(), z.number(), z.null()]).optional().transform(val =>
        val === null || val === undefined ? undefined :
        typeof val === 'string' ? new Date(val).getTime() : val
    ),
    location: z.string().optional(),
    contributors: z.string().optional(),
    description: z.string(),
    cover: ImageInfoSchema,
    content: z.array(ArchProjectContentSchema).optional(),
});

export type ZaneArchProjectDto = z.infer<typeof ZaneArchProjectDtoSchema>;

/**
 * Schema for developer project DTO from GraphQL API
 * Note: Dates can be either strings (ISO format) or numbers (timestamps)
 */
export const ZaneDevProjectDtoSchema = z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean(),
    startDate: z.union([z.string(), z.number()]).transform(val =>
        typeof val === 'string' ? new Date(val).getTime() : val
    ),
    endDate: z.union([z.string(), z.number(), z.null()]).optional().transform(val =>
        val === null || val === undefined ? undefined :
        typeof val === 'string' ? new Date(val).getTime() : val
    ),
    description: z.string(),
    externalLink: z.string().url("Invalid external link URL"),
    cover: ImageInfoSchema,
});

export type ZaneDevProjectDto = z.infer<typeof ZaneDevProjectDtoSchema>;

/**
 * Schema for homepage DTO from GraphQL API
 */
export const HomepageDtoSchema = z.object({
    whoAmI: z.string(),
});

export type HomepageDto = z.infer<typeof HomepageDtoSchema>;

/**
 * Schema for about me timeline entry
 */
export const TimelineEntrySchema = z.object({
    year: z.array(z.number()),
    experience: z.string(),
});

/**
 * Schema for about me DTO from GraphQL API
 */
export const ZaneAboutMeSchema = z.object({
    aboutMe: z.string(),
    timeline: z.array(TimelineEntrySchema),
});

export type ZaneAboutMe = z.infer<typeof ZaneAboutMeSchema>;

/**
 * Schema for GraphQL response wrapper
 */
export const GraphQLResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        data: dataSchema.nullable(),
        errors: z
            .array(
                z.object({
                    message: z.string(),
                    locations: z.any().optional(),
                    path: z.any().optional(),
                    extensions: z.any().optional(),
                })
            )
            .optional(),
    });

/**
 * Error class for CMS-related errors
 */
export class CMSError extends Error {
    constructor(
        message: string,
        public readonly cause?: unknown,
        public readonly statusCode?: number
    ) {
        super(message);
        this.name = "CMSError";
    }
}
