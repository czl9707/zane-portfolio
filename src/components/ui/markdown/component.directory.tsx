import 'server-only';

import type { BlockContent, DefinitionContent, Root, RootContent } from 'mdast';
import type { ContainerDirective } from 'mdast-util-directive';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { VFile } from 'vfile';

export const catagoryBlockTypeName = "catagory" as const;

export function extractTOC(content: string) {
    console.log(content);
    const processor = unified().use(remarkParse);
    const vfile = new VFile();
    vfile.value = content;
    const tree = processor.parse(vfile);

    const result = []
    for (const child of tree.children) {
        if (child.type === "heading") {
            const catagory = toString(child);
            const hash = catagoryToHash(catagory);
            result.push({ depth: child.depth, displayName: catagory, hash: hash })
        }
    }

    return result;
}

export function wrapDirectory() {
    return function (tree: Root) {
        const modified: RootContent[] = [];

        for (const child of tree.children) {
            if (child.type !== "heading") {
                if (modified.length === 0) modified.push(newDirecitve());
                (modified[modified.length - 1] as ContainerDirective).children.push(child as BlockContent | DefinitionContent);
                continue;
            }

            const catagory = toString(child);
            const hash = catagoryToHash(catagory);
            // Add id and href to heading.
            child.data = child.data ?? {};
            child.data.hProperties = child.data.hProperties ?? {};
            child.data.hProperties.id = hash;
            child.data.hProperties.href = hash;
            // push to modified list.
            modified.push(child);
            modified.push(newDirecitve(catagory));
        }

        tree.children = modified;
    }
}


function newDirecitve(catagory: string = ""): ContainerDirective {
    return {
        name: catagoryBlockTypeName,
        type: "containerDirective",
        data: {
            hProperties: {
                catagory: catagory,
            },
            hName: 'section'
        },
        children: []
    }
}

function catagoryToHash(heading: string) {
    return heading.replaceAll(" ", "_").replaceAll(/[+-:!.,/;\[\]]/g, "");
}
