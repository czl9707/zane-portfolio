import * as React from 'react';
import clsx from "clsx";
import * as Slot from '@radix-ui/react-slot'

import * as Container from '@/components/ui/container';

import style from './sticky-hero.module.css'

const StickyHero = React.forwardRef<HTMLDivElement, Slot.SlotProps & { asChild?: boolean }>(
    function StickyHero({ className, asChild = false, children, ...others }, ref) {
        const Comp = asChild ? Slot.Root : Container.FullWidth;
        return <div className={style.StickyHero}>
            <Comp className={clsx(style.StickyHeroContent, className)}
                {...others} ref={ref}>
                {children}
            </Comp>
        </div>
    }
)

export default StickyHero;
