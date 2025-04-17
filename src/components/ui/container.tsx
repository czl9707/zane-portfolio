import * as React from 'react';
import clsx from "clsx";

import style from './container.module.css'

const FullWidthContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function FullWidthContainer({ className, ...other }, ref) {
        return (
            <div className={clsx(className, style.FullWidthContainer)}
                ref={ref} {...other} />
        )
    }
)

export {
    FullWidthContainer as FullWidth,
};