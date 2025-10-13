import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import * as ArchProject from "@/lib/cms/zane-arch-project";
import * as DevProject from "@/lib/cms/zane-dev-project";

const blog = defineCollection({
    loader: glob({
        base: "./src/contents/",
        pattern: ["blog/**/*.md", "!**/drafts/**"]
    }),
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string(),
            cover: z.string(),
            tags: z.array(z.string()),
            featured: z.boolean(),
            "created-date": z.date(),
            "last-updated-date": z.date(),
        }),
});

const note = defineCollection({
    loader: glob({
        base: "./src/contents/",
        pattern: ["note/**/*.md", "!**/drafts/**"],
    }),
    schema: () =>
        z.object({
            title: z.string(),
            tags: z.array(z.string()),
            "created-date": z.date(),
            "last-updated-date": z.date(),
        }),
});

const imageInfo = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
    alt: z.string(),
});

const devProject = defineCollection({
    loader: async () => {
        return (await DevProject.getAll()).map(proj => ({
            id: proj.title,
            ...proj
        }));
	},
    schema: () => z.object({
        title: z.string(),
        tags: z.array(z.string()),
        featured: z.boolean(),
        startDate: z.date(),
        endDate: z.date().nullable().optional(),
        description: z.string(),
        externalLink: z.string(),
        cover: imageInfo,
    })
})

const archProject = defineCollection({
    loader: async () => {
		const projectIds = await ArchProject.getAll();
		const projects: {id: string}[] = [];
		for (const id of projectIds)
		{
			projects.push(await ArchProject.getById(id));
		}
		return projects;
	},
    schema: () =>
        z.object({
            title: z.string(),
            subTitle: z.string(),
            tags: z.array(z.string()),
            featured: z.boolean(),
            startDate: z.date(),
            endDate: z.date().nullable().optional(),
            location: z.string().nullable().optional(),
            contributors: z.string().nullable().optional(),
            description: z.string(),
            cover: imageInfo,
            content: z.array(
                z.object({
                    catagory: z.array(z.string()),
                    visible: z.boolean(),
                    blocks: z.array(
                        z.union([
                            z.object({
                                blockType: z.literal("multiImage"),
                                images: z.array(
                                    z.object({
                                        image: imageInfo,
                                        annotation: z.string().nullable().optional(),
                                    })
                                ),
                                rows: z.number(),
                            }),
                            z.object({
                                blockType: z.literal("imageAndText"),
                                image: imageInfo,
                                title: z.string().nullable(),
                                text: z.string(),
                                annotation: z.string().nullable().optional(),
                            }),
                            z.object({
                                blockType: z.literal("fullText"),
                                title: z.string().nullable().optional(),
                                text: z.string(),
                            }),
                            z.object({
                                blockType: z.literal("fullSizeImage"),
                                image: imageInfo,
                                annotation: z.string().nullable().optional(),
                            }),
                        ])
                    ),
                })
            ),
        }),
});

export const collections = { blog, note, archProject, devProject };
