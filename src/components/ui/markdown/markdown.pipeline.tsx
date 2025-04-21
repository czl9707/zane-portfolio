import 'server-only';

import { default as BaseMarkdown } from "react-markdown";
import type { Components } from "react-markdown";
import type { PluggableList } from "unified";
import remarkDirective from 'remark-directive';

import * as React from 'react'
import clsx from 'clsx';

import * as T from '@/components/ui/typography'
import Divider from "@/components/ui/divider";
import QuoteBlock from "@/components/ui/quote-block";
import { CodeRouter, LinkRouter, DivRouter } from "./component.common";
import { multiCodeblockConverter } from './component.multi-codeblock';


import style from './markdown.module.css'

const defaultComponents: Components = {
    h1: T.H3,
    h2: T.H4,
    h3: T.H5,
    h4: T.H5,
    h5: T.H6,
    h6: T.H6,
    p: T.Body1,
    hr: Divider,
    blockquote: QuoteBlock,
    code: CodeRouter,
    a: LinkRouter,
    div: DivRouter,
};

type MarkdownProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & { children: string, components?: Components, remarkPlugins?: PluggableList };

const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
    function Markdown(
        { children, className, components: componentsOverride, remarkPlugins = [], ...others }, ref
    ) {
        return (<div ref={ref} {...others} className={clsx(className, style.MarkdownBase)}>
            <BaseMarkdown components={{ ...defaultComponents, ...componentsOverride }}
                remarkPlugins={[remarkDirective, multiCodeblockConverter, ...remarkPlugins]}>
                {children}
            </BaseMarkdown>
        </div>)
    }
);

export default Markdown;
export type { MarkdownProps }