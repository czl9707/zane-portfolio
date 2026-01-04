import type * as Mdast from 'mdast';
import { visit, CONTINUE } from 'unist-util-visit'

/**
 * Remark plugin to convert relative image paths to absolute paths.
 *
 * This plugin transforms relative image paths from markdown files (typically
 * from Obsidian vault or git submodule) to absolute paths that work with
 * Astro's asset pipeline.
 *
 * **Transformations:**
 * - `Media/image.png` → `/src/contents/Media/image.png`
 * - External URLs (http/https) are left unchanged
 * - Absolute paths (starting with `/`) are left unchanged
 *
 * @returns A unified transformer function
 *
 * @example
 * ```typescript
 * // In astro.config.mjs
 * remarkPlugins: [remarkImageTranslation]
 *
 * // Input markdown: ![Alt text](Media/screenshot.png)
 * // Output: <img src="/src/contents/Media/screenshot.png" alt="Alt text">
 * ```
 */
export function remarkImageTranslation()
{
    return function(tree: Mdast.Root)
    {
        visit(tree,
            (node: Mdast.Node) => node.type === "image",
            (node) => {
                const url = (node as Mdast.Image).url!;

                // Only transform relative paths (not URLs or absolute paths)
                if (!url.startsWith("http") && !url.startsWith("/"))
                {
                    // Prepend contents directory path for Astro to resolve
                    (node as Mdast.Image).url! = '/src/contents/' + url;
                }
                return CONTINUE;
            },
        )
    }
}