import type * as Hast from 'hast';
import { VFile } from 'vfile'
import { visit, CONTINUE } from 'unist-util-visit'
import { toString as htmlToString } from 'hast-util-to-string';

export function rehypeHashStyleHeadings()
{
    return function(tree: Hast.Root, file: VFile)
    {
        for (const heading of (file.data.astro?.headings ?? []))
        {
            heading.slug = heading.text;
        }

        visit(tree, 
            (node: Hast.Node) => node.type === "element" && (node as Hast.Element).tagName.startsWith("h"), 
            (node) => {
                const el = node as Hast.Element;
                el.properties = el.properties ?? {};
                el.properties.id = htmlToString(el);

                return CONTINUE
            },
        )    
    }
}