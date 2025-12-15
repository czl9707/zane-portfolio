import type * as Mdast from 'mdast';
import { visit, CONTINUE } from 'unist-util-visit'


export function remarkImageTranslation()
{
    return function(tree: Mdast.Root)
    {
        visit(tree, 
            (node: Mdast.Node) => node.type === "image", 
            (node) => {
                const url = (node as Mdast.Image).url!;

                if (!url.startsWith("http") && !url.startsWith("/"))
                {
                    (node as Mdast.Image).url! = '/src/contents/' + url;
                }
                return CONTINUE;
            },
        )
    }
}