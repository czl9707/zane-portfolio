import * as React from 'react'
import { styled, css } from '@pigment-css/react'

import Link from "next/link";
import { CodeHighLighter, InlineCodeBlock, CodePanel } from '@/components/ui/code';
import { MultiCodeBlock, multiCodeBlockTypeName } from './component.multi-codeblock';


export const Ol = styled("ol")(({ theme }) => ({
    listStyleType: "decimal", paddingLeft: theme.spacing.component,
    fontFamily: theme.typographies.body1.fontFamily,
    fontSize: theme.typographies.body1.fontSize,
    fontWeight: theme.typographies.body1.fontWeight,
    lineHeight: theme.typographies.body1.lineHeight,
}));

export const Ul = styled("ul")(({ theme }) => ({
    listStyleType: "disc", paddingLeft: theme.spacing.component,
    fontFamily: theme.typographies.body1.fontFamily,
    fontSize: theme.typographies.body1.fontSize,
    fontWeight: theme.typographies.body1.fontWeight,
    lineHeight: theme.typographies.body1.lineHeight,
}));

const underLine = css({ textDecorationLine: "underline" })
export const LinkUnderLine = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    function LinkUnderLine({ className, href, ...other }, ref) {
        if (href?.startsWith("http")) {
            return (
                <Link ref={ref} href={href as string} target="_blank" {...other}
                    className={[underLine, className].join(" ")} />
            )
        }
        return (
            <Link ref={ref} href={href as string} {...other}
                className={[underLine, className].join(" ")} />
        )
    }
)

export const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
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

