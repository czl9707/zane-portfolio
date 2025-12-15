import type * as Mdast from 'mdast';
import { visit, CONTINUE } from 'unist-util-visit'
import type { VFile } from 'vfile';

export function remarkReferenceTranslation()
{
    return function(tree: Mdast.Root, file: VFile)
    {
        const links: Set<string> = new Set();
        visit(tree, 
            (node: Mdast.Node) => node.type === "link", 
            (node) => {
                // Obsidian have file path without "/" at the beginning, add "/" to fix inter links
                const path = (node as Mdast.Link).url.split("#")[0];
                if (path.endsWith(".md") && !path.startsWith("/"))
                {
                    (node as Mdast.Link).url = '/' + (node as Mdast.Link).url.replace(".md", "");
                    
                    links.add(path.replace(".md", ""));
                }
                return CONTINUE;
            },
        );
        
        file.data!.hasLinksTo = Array.from(links);
    }
}