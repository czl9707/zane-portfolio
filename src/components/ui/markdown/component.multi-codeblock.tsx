import 'server-only';

import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

import * as React from 'react';

import { CodePanel, CodeHighLighter } from '@/components/ui/code'


// :::multi-codeblocks
// ``` tsx filename=accordion.tsx
// ```
// ``` css filename=accordion.tsx
// ```
// :::

const filenameReg = /filename=(?<filename>[^\ ]+)/g;

export const multiCodeBlockTypeName = "multi-codeblocks" as const;

export function multiCodeblockConverter() {
    return function (tree: Root) {
        visit(tree, function (node) {
            if (!(node.type === 'containerDirective' && node.name === multiCodeBlockTypeName)) {
                return;
            }

            for (const child of node.children) {
                if (child.type !== 'code') throw new Error("multi-codeblocks only allow fenced code as child")
                const match = child.meta?.matchAll(filenameReg).toArray();
                const filename = match![0].groups?.filename;
                if (filename == undefined)
                    throw new Error("invalid filename meta for multi-codeblocks")

                const childData = child.data || (child.data = {});
                childData.hProperties = childData.hProperties ?? {};
                childData.hProperties.language = child.lang ?? "";
                childData.hProperties.filename = filename;
            }

            const data = node.data || (node.data = {});
            data.hProperties = data.hProperties ?? {};
            data.hProperties.type = multiCodeBlockTypeName;
        })
    }
}

export const MultiCodeBlock = React.forwardRef<HTMLDivElement, {
    children: React.ReactNode
}>(
    function MultiCodeBlock({ children }, ref) {
        // children is a <pre><code>...<code/><pre/>
        const contents = (children as React.ReactElement<{
            children: React.ReactElement<{ children: string, filename: string, language: string }>,
        }>[]).map(child => ({
            filename: child.props.children.props.filename,
            content: child.props.children.props.children,
            language: child.props.children.props.language,
        }));

        return (
            <CodePanel.Root defaultValue={contents[0].filename} ref={ref}>
                <CodePanel.List>
                    {
                        contents.map(({ filename }) => (
                            <CodePanel.Trigger value={filename} key={filename}>
                                {filename}
                            </CodePanel.Trigger>
                        ))
                    }
                </CodePanel.List>
                {
                    contents.map(({ filename, content, language = "" }) => (
                        <CodePanel.Content tabName={filename} key={filename} copiableText={content}>
                            <CodeHighLighter language={language} content={content} />
                        </CodePanel.Content>
                    ))
                }
            </CodePanel.Root>
        )
    }
);
