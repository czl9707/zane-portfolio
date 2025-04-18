import * as React from 'react';
import clsx from "clsx";

import * as Container from '@/components/ui/container';

import style from './sticky-hero.module.css'

const StickyHero = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function StickyHero({ className, ...other }, ref) {
        return (
            <Container.FullWidth className={clsx(style.StickyHero, className)}
                ref={ref} {...other} />
        )
    }
)

export default StickyHero;
