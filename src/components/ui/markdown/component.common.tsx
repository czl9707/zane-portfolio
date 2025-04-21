import * as React from 'react'

import Link from "next/link";
import { CodeHighLighter, InlineCodeBlock, CodePanel } from '@/components/ui/code';
import { MultiCodeBlock, multiCodeBlockTypeName } from './component.multi-codeblock';

import style from './component.common.module.css'
import clsx from 'clsx';

export const LinkRouter = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    function LinkRouter({ href, className, ...other }, ref) {
        return (
            <Link ref={ref} href={href as string} {...other}
                target={href?.startsWith("http") ? "_blank" : undefined}
                className={clsx(style.LinkUnderline, className)} />
        )
    }
)

export const CodeRouter = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    function StyleCodeBlock({ className, children, ...other }, ref) {
        if (className?.includes("language-")) {
            const language = className!.split(" ").filter(s => s.includes("language-"))[0].replace("language-", "");
            return (
                <CodePanel.Root value="none">
                    <CodePanel.Content copiableText={children as string} tabName="none"
                        className={className} {...other} ref={ref}>
                        <CodeHighLighter content={children as string} language={language} />
                    </CodePanel.Content>
                </CodePanel.Root>
            )
        }
        else {
            return <InlineCodeBlock className={className} {...other} ref={ref}>{children}</InlineCodeBlock>;
        }
    }
)

export const DivRouter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { type?: string }>(
    function DivRouter({ type, children }, ref) {
        if (type === multiCodeBlockTypeName) {
            return <MultiCodeBlock ref={ref} >{children}</MultiCodeBlock>
        }
        else {
            return undefined;
        }
    }
)