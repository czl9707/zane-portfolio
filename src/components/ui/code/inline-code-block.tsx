import * as React from 'react';
import clsx from 'clsx';

import style from './inline-code-block.module.css'

const InlineCodeBlock = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    function InlineCodeBlock({ className, ...other }, ref) {
        return (
            <code className={clsx(style.InlineCodeBlock, className)}
                {...other} ref={ref} />
        );
    }
)

export default InlineCodeBlock;