import 'server-only';

import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import * as React from 'react'

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import { Code, Ol, Ul, LinkUnderLine, DivRouter } from "./component.common";

import remarkDirective from 'remark-directive';
import { multiCodeblockConverter } from './component.multi-codeblock';

const defaultComponents: Components = {
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
    div: DivRouter,
};

const StyledMarkdown = React.forwardRef<
    HTMLDivElement,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & { children: string, components?: Components }
>(
    function StyledMarkdown({ children, components: componentsOverride, ...others }, ref) {
        return (<div ref={ref} {...others}>
            <Markdown components={{ ...defaultComponents, ...componentsOverride }}
                remarkPlugins={[remarkDirective, multiCodeblockConverter]}
                unwrapDisallowed disallowedElements={['pre']}>
                {children}
            </Markdown>
        </div>)
    }
);

export default StyledMarkdown;