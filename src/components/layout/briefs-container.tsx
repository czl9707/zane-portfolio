import * as React from 'react';
import clsx from "clsx";


import style from './sticky-hero.module.css'

const BriefsContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function BriefsContainer({ className, ...other }, ref) {
        return (
            <div className={clsx(style.BriefsContainer, className)}
                ref={ref} {...other} />
        )
    }
)

export default BriefsContainer;
