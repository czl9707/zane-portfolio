import type * as Hast from 'hast';

export function rehypeInjectClassname({class2inject}: { class2inject: string })
{
    return function(tree: Hast.Root)
    {
        for (const section of tree.children)
        {
            var className: string = (section as Hast.Element).properties?.class as string ?? "";
            className += " " + class2inject;

            if ((section as Hast.Element).properties == undefined)
                (section as Hast.Element).properties = {};
            (section as Hast.Element).properties!.class = className;
        }
    }
}