import { unified, type PluggableList } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import RehypeReferenceTranslation from "@/components/ui/markdown/rehype-reference-translation";


async function render(
    content: string,
    remarkPlugins: PluggableList = [],
    rehypePlugins: PluggableList = []
) {
    const processor = unified()
        .use(remarkParse)
        .use(remarkPlugins)
        .use(remarkRehype)
        .use([RehypeReferenceTranslation, ...rehypePlugins])
        .use(rehypeStringify);

    const result = await processor.process(content);
    return result;
}

export {
    render
}