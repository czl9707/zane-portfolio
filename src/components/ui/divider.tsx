import * as React from 'react';
import clsx from "clsx";

import style from './divider.module.css'

const Divider = React.forwardRef<HTMLSpanElement, React.HTMLProps<HTMLSpanElement>>(
    function Divider({ className, ...other }, ref) {
        return (
            <span className={clsx(className, style.Divider)}
                ref={ref} {...other} />
        )
    }
)

export default Divider;