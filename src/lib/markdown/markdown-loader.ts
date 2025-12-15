import type { Loader, LoaderContext } from 'astro/loaders';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { remarkReferenceTranslation } from "@/lib/markdown/remark-reference-translation";


export function markdownLoader(options: { baseLoader: Loader }): Loader {
  return {
    name: "markdown-loader",
    load: async (context: LoaderContext): Promise<void> => {
        const baseLoader = options.baseLoader;
        await baseLoader.load(context);

        const processor = unified()
            .use(remarkParse)
            .use([remarkReferenceTranslation])
            .use(remarkStringify);

        for (const entry of context.store.values()) {
            const processed = await processor.process(entry.body);
            entry.data.hasLinksTo = processed.data.hasLinksTo;
        }
    },
  };
}