import Markdown from "react-markdown";
import * as React from 'react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";

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
        }}>
            {children}
        </Markdown>
    )
}