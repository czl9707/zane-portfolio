import Markdown, { MarkdownProps } from './markdown.pipeline'

import * as React from 'react'
import clsx from 'clsx';

import style from './markdown.module.css';

const HighLightMarkdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
    function HighLightMarkdown({ className, ...others }, ref) {
        return <Markdown {...others} ref={ref}
            className={clsx(className, style.HighLightMarkdown)} />
    }
);


export {
    Markdown as Default,
    HighLightMarkdown as LinkHighlight,
}