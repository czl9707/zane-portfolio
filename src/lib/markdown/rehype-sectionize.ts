import type * as Hast from 'hast';
import { toString as htmlToString } from 'hast-util-to-string';

/**
 * Rehype plugin to wrap content in semantic sections based on headings.
 *
 * This plugin restructures the HTML AST to group content into `<section>` elements,
 * with each heading (h1-h6) starting a new section. This creates a semantic HTML
 * structure that enables:
 * - Table of contents generation with scroll highlighting
 * - Anchor links to specific sections
 * - Improved accessibility and document structure
 *
 * **Transformations:**
 * 1. Each heading becomes the first child of a new `<section>`
 * 2. Heading gets an `id` attribute from its text content
 * 3. Section gets `data-slug` attribute and `TOC_ContentContainer` class
 * 4. A horizontal rule (`<hr>`) is added after each heading
 * 5. All non-heading content is grouped into the current section
 *
 * @returns A unified transformer function
 *
 * @example
 * ```typescript
 * // Input HTML:
 * // <h2>Introduction</h2>
 * // <p>Some text</p>
 * // <h2>Conclusion</h2>
 *
 * // Output HTML:
 * // <section data-slug="Introduction" class="TOC_ContentContainer">
 * //   <h2 id="Introduction">Introduction</h2>
 * //   <hr />
 * //   <p>Some text</p>
 * // </section>
 * // <section data-slug="Conclusion" class="TOC_ContentContainer">
 * //   <h2 id="Conclusion">Conclusion</h2>
 * //   <hr />
 * // </section>
 * ```
 */
export function rehypeSectionize() {
    return function(tree: Hast.Root) {
        const sections: Hast.Element[] = [];

        for (const child of tree.children) {
            // Skip existing sections (don't double-wrap)
            if (child.type === "element" && child.tagName === "section") {
                sections.push(child as Hast.Element);
            }
            // Create a new section for each heading
            else if (child.type === "element" && child.tagName.match(/^h[1-6]$/)) {
                // Use heading text content as the section identifier
                const category = htmlToString(child);
                child.properties = child.properties ?? {};
                child.properties.id = category;

                // Wrap heading in a section with metadata for TOC and styling
                sections.push({
                    type: "element",
                    tagName: "section",
                    properties: {
                        "data-slug": category,
                        class: "TOC_ContentContainer"
                    },
                    children: [
                        child,
                        { type: "element", tagName: "hr", properties: {}, children: [] }
                    ]
                });
            }
            // Add non-heading content to the current section
            else {
                if (sections.length === 0) {
                    // Create an initial section if content appears before first heading
                    sections.push({
                        type: "element",
                        tagName: "section",
                        properties: {},
                        children: [child as Hast.Element]
                    });
                }
                else {
                    // Append to the most recent section
                    sections[sections.length - 1].children.push(child as Hast.Element);
                }
            }
        }

        tree.children = sections;
        return tree;
    }
}
