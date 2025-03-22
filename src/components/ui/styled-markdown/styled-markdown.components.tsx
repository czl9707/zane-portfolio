import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import * as React from 'react'
import { styled, css } from '@pigment-css/react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import Link from "next/link";
import CodeBlock from '@/components/ui/code/code-block';
import InlineCode from '@/components/ui/code/inline-code';


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
    function StyleCodeBlock({ className, ...other }, ref) {
        if (className?.includes("language-")) {
            return <CodeBlock className={className} {...other} ref={ref} />;
        }
        else {
            return <InlineCode className={className} {...other} ref={ref} />;
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