import type * as Hast from 'hast';
import { toString as htmlToString } from 'hast-util-to-string';

export function rehypeSectionize() {
    return function(tree: Hast.Root) {
        const sections: Hast.Element[] = [];

        for (const child of tree.children) {
            if (child.type === "element" && child.tagName === "section") {
                sections.push(child as Hast.Element);
            } 
            else if (child.type === "element" && child.tagName.match(/^h[1-6]$/)) {
                const catagory = htmlToString(child);
                child.properties = child.properties ?? {};
                child.properties.id = catagory;
                
                sections.push({ type: "element", tagName: "section", properties: { "data-slug": catagory, class: "TOC_ContentContainer" }, children: [
                    child,
                    { type: "element", tagName: "hr", properties: {}, children: [] }
                ] });

            }
            else {
                if (sections.length === 0) {
                    sections.push({ type: "element", tagName: "section", properties: {}, children: [child as Hast.Element] });
                }
                else {
                    sections[sections.length - 1].children.push(child as Hast.Element);
                }
            }
        }

        tree.children = sections;
        return tree;
    }
}
