import type * as Mdast from 'mdast';
import type { VFile } from 'vfile';
import { visit, CONTINUE } from 'unist-util-visit'
import path from 'node:path';
/**
 * Remark plugin to convert relative image paths to relative paths based on file location.
 *
 * This plugin transforms relative image paths from markdown files (typically
 * from Obsidian vault or git submodule) to relative paths that resolve from
 * the current markdown file's directory to the image in the contents folder.
 *
 * **Transformations:**
 * - `Media/image.png` → `../../contents/Media/image.png` (relative to markdown file)
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
 * // Output: <img src="../../contents/Media/screenshot.png" alt="Alt text">
 * ```
 */
export function remarkImageTranslation()
{
    return function(tree: Mdast.Root, file: VFile)
    {
        const filePath = file.history![0];

        visit(tree,
            (node: Mdast.Node) => node.type === "image",
            (node) => {
                const url = (node as Mdast.Image).url!;

                if (!url.startsWith("http") && (url.startsWith("/Media") || url.startsWith("Media")))
                {
                    const imgPath = path.join(file.cwd!, "src", "contents", url);
                    (node as Mdast.Image).url! = path.relative(path.dirname(filePath), imgPath);
                }
                return CONTINUE;
            },
        )
    }
}