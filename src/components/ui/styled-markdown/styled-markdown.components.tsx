import 'server-only';

import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import * as React from 'react'
import { styled, css } from '@pigment-css/react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import Link from "next/link";
import { CodeHighLighter, InlineCodeBlock, CodePanel } from '@/components/ui/code';


const Ol = styled("ol")(({ theme }) => ({
    listStyleType: "decimal", paddingLeft: theme.spacing.component,
    fontFamily: theme.typographies.body1.fontFamily,
    fontSize: theme.typographies.body1.fontSize,
    fontWeight: theme.typographies.body1.fontWeight,
    lineHeight: theme.typographies.body1.lineHeight,
}));

const Ul = styled("ul")(({ theme }) => ({
    listStyleType: "disc", paddingLeft: theme.spacing.component,
    fontFamily: theme.typographies.body1.fontFamily,
    fontSize: theme.typographies.body1.fontSize,
    fontWeight: theme.typographies.body1.fontWeight,
    lineHeight: theme.typographies.body1.lineHeight,
}));

const underLine = css({ textDecorationLine: "underline" })
const LinkUnderLine = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
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

const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
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


const components: Components = {
    h1: T.H3,
    h2: T.H4,
    h3: T.H5,
    h4: T.H5,
    h5: T.H6,
    h6: T.H6,
    p: T.Body1,
    hr: Divider,
    code: Code,
    blockquote: QuoteBlock,
    ol: Ol,
    ul: Ul,
    a: LinkUnderLine,
};

const StyledMarkdown = React.forwardRef<
    HTMLDivElement,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & { children: string }
>(
    function StyledMarkdown({ children, ...others }, ref) {
        return (<div ref={ref} {...others}>
            <Markdown components={components} disallowedElements={['pre']} unwrapDisallowed >
                {children}
            </Markdown>
        </div>)
    }
);

export default StyledMarkdown;