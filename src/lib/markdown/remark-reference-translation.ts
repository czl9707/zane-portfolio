import type * as Mdast from 'mdast';
import { visit, CONTINUE } from 'unist-util-visit'
import type { VFile } from 'vfile';

/**
 * Remark plugin to convert Obsidian-style internal links to Astro routes.
 *
 * This plugin transforms markdown links in the Obsidian format (e.g., "blog/post.md")
 * into Astro-compatible routes (e.g., "/blog/post"). It also tracks all internal
 * links to build a knowledge graph of content relationships.
 *
 * **Transformations:**
 * - `blog/post.md` → `/blog/post`
 * - `blog/post.md#heading` → `/blog/post#heading`
 * - External links and absolute paths are left unchanged
 *
 * **Side Effects:**
 * - Populates `file.data.hasLinksTo` with an array of linked file paths (without extensions)
 *
 * @returns A unified transformer function
 *
 * @example
 * ```typescript
 * // In astro.config.mjs
 * remarkPlugins: [remarkReferenceTranslation]
 *
 * // Input markdown: [My Post](blog/my-post.md)
 * // Output HTML: <a href="/blog/my-post">My Post</a>
 * ```
 */
export function remarkReferenceTranslation()
{
    return function(tree: Mdast.Root, file: VFile)
    {
        const links: Set<string> = new Set();
        visit(tree,
            (node: Mdast.Node) => node.type === "link",
            (node) => {
                // Obsidian has file paths without "/" at the beginning
                // We add "/" to convert them to absolute Astro routes
                const path = (node as Mdast.Link).url.split("#")[0];
                if (path.endsWith(".md") && !path.startsWith("/"))
                {
                    // Transform: "blog/post.md#heading" → "/blog/post#heading"
                    (node as Mdast.Link).url = '/' + (node as Mdast.Link).url.replace(".md", "");

                    // Track this link for knowledge graph building
                    links.add(path.replace(".md", ""));
                }
                return CONTINUE;
            },
        );

        // Store all internal links in file metadata for use by content collections
        file.data!.hasLinksTo = Array.from(links);
    }
}