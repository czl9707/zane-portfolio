import { unified, type PluggableList } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { rehypeExternalLinkAttr } from "@/lib/markdown/rehype-external-link-attr";


async function render(
    content: string,
    remarkPlugins: PluggableList = [],
    rehypePlugins: PluggableList = []
) {
    const processor = unified()
        .use(remarkParse)
        .use([...remarkPlugins])
        .use(remarkRehype)
        .use([rehypeExternalLinkAttr, ...rehypePlugins])
        .use(rehypeStringify);

    const result = await processor.process(content);
    return result;
}

export {
    render
}