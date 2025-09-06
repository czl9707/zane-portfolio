import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/contents/blog/', pattern: ['**/*.md', '!**/drafts/**'] }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			"cover-url": z.string(),
			tags: z.array(z.string()),
			featured: z.boolean(),
			"created-date": z.date(),
			"last-updated-date": z.date(),
		}),
});

const note = defineCollection({
	loader: glob({ base: './src/contents/note/', pattern: ['**/*.md', '!**/drafts/**'] }),
	schema: () =>
		z.object({
			title: z.string(),
			tags: z.array(z.string()),
			"created-date": z.date(),
			"last-updated-date": z.date(),
		}),
});


export const collections = { blog, note };
