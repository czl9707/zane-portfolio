import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import * as React from 'react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import { twMerge } from "@/lib/utils/tw-merge";
import Link from "next/link";
import { twJoin } from "tailwind-merge";



const Ol = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
    function Ol({ className, ...other }, ref) {
        return (
            <T.Body1>
                <ol ref={ref} {...other} className={twMerge("list-decimal pl-component", className)} />
            </T.Body1>
        )
    }
)

const Ul = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLOListElement>>(
    function Ul({ className, ...other }, ref) {
        return (
            <T.Body1>
                <ul ref={ref} {...other} className={twMerge("pl-component list-disc", className)} />
            </T.Body1>
        )
    }
)

const LinkUnderLine = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    function LinkUnderLine({ className, href, ...other }, ref) {
        if (href?.startsWith("http")) {
            return (
                <Link ref={ref} href={href as string} target="_blank" {...other} className={twMerge("underline", className)} />
            )
        }
        return (
            <Link ref={ref} href={href as string} {...other} className={twMerge("underline", className)} />
        )
    }
)

const components: Components = {
    h1: T.H1,
    h2: T.H2,
    h3: T.H3,
    h4: T.H4,
    h5: T.H5,
    h6: T.H6,
    p: T.Body1,
    hr: Divider,
    // code:,
    // pre:,
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
        <div className={twJoin(
            "[&_*]:transition-colors [&_*]:ease-linear [&_*]:duration-300",
            "[&_a]:text-foreground",
            "[&:hover_span]:text-foreground/50",
            "[&:hover_li]:text-foreground/50",
            "[&:hover_p]:text-foreground/50",
            "[&:hover_h1]:text-foreground/50",
            "[&:hover_h2]:text-foreground/50",
            "[&:hover_h3]:text-foreground/50",
            "[&:hover_h4]:text-foreground/50",
            "[&:hover_h5]:text-foreground/50",
            "[&:hover_h6]:text-foreground/50",
        )}>
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