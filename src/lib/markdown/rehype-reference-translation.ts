import type * as Hast from 'hast';
import { visit, CONTINUE } from 'unist-util-visit'


export function rehypeReferenceTranslation()
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

                // Obsidian have file path without "/" at the beginning, add "/" to fix inter links
                const path = href.split("#")[0];
                if (path.endsWith(".md") && !path.startsWith("/"))
                {
                    (node as Hast.Element).properties!.href = '/' + href.replace(".md", "");
                }
                return CONTINUE;
            },
        )
    }
}