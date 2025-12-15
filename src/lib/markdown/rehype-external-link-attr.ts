import type * as Hast from 'hast';
import { visit, CONTINUE } from 'unist-util-visit'

export function rehypeExternalLinkAttr()
{
    return function(tree: Hast.Root)
    {
        visit(tree, 
            (node: Hast.Node) => node.type === "element" && (node as Hast.Element).tagName === "a", 
            (node) => {
                const href = ((node as Hast.Element).properties?.href ?? "") as string;
                // External link
                if (href.startsWith("http"))
                {
                    (node as Hast.Element).properties["target"] = "_blank"; 
                    return CONTINUE;
                }
            },
        )
    }
}