import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import * as React from 'react'
import { styled, css } from '@pigment-css/react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import Link from "next/link";
import CodePanel from '@/components/ui/code-panel';


const Ol = styled("ol")(({ theme }) => ({
    listStyleType: "decimal", paddingLeft: theme.spacing.component,
    fontFamily: theme.typographies.body1.fontFamily,
    fontSize: theme.typographies.body1.fontSize,
    fontWeight: theme.typographies.body1.fontWeight,
    lineHeight: theme.typographies.body1.lineHeight,
}));

const Ul = styled("ol")(({ theme }) => ({
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

const components: Components = {
    h1: T.H3,
    h2: T.H3,
    h3: T.H4,
    h4: T.H4,
    h5: T.H5,
    h6: T.H6,
    p: T.Body1,
    hr: Divider,
    // code:,
    pre: CodePanel,
    blockquote: QuoteBlock,
    ol: Ol,
    ul: Ul,
    a: LinkUnderLine,
}

function StyledMarkdown({ children }: { children: string }) {
    return (
        <Markdown components={components}>
            {children}
        </Markdown>
    )
}

function StyledMarkdownHighlightLink({ children }: { children: string }) {
    return (
        <div className={css(({ theme }) => ({
            "*": { transition: `color ${theme.transition.short} linear` },
            'a': { color: `rgb(${theme.vars.color.default.foreground})` },
            "&:hover": {
                "span, li, p, h1, h2, h3, h4, h5, h6": {
                    color: `rgb(${theme.vars.color.default.foreground} / 50%)`
                }
            }
        }))}>
            <Markdown components={components} >
                {children}
            </Markdown>
        </div>
    )
}


export {
    StyledMarkdown as Default,
    StyledMarkdownHighlightLink as LinkHighlight,
}