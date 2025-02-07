import Markdown from "react-markdown";
import * as React from 'react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import { twMerge } from "@/lib/utils/tw-merge";

export default function StyledMarkdown({ children }: { children: string }) {
    return (
        <Markdown components={{
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
            ul: Ul
        }}>
            {children}
        </Markdown>
    )
}


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