import * as React from 'react';
import clsx from "clsx";

import style from './divider.module.css'

const QuoteBlock = React.forwardRef<HTMLQuoteElement, React.HTMLProps<HTMLQuoteElement>>(
    function QuoteBlock({ className, ...other }, ref) {
        return (
            <blockquote className={clsx(className, style.QuoteBlock)}
                ref={ref} {...other} />
        )
    }
)

export default QuoteBlock;