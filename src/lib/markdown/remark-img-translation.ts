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
 * - `media/image.png` → `../../contents/media/image.png` (relative to markdown file)
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
 * // Input markdown: ![Alt text](media/screenshot.png)
 * // Output: <img src="../../contents/media/screenshot.png" alt="Alt text">
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

                if (!url.startsWith("http") && (url.startsWith("/media") || url.startsWith("media")))
                {
                    const imgPath = path.join(file.cwd!, "src", "contents", url);
                    (node as Mdast.Image).url! = path.relative(path.dirname(filePath), imgPath);
                }
                return CONTINUE;
            },
        )
    }
}