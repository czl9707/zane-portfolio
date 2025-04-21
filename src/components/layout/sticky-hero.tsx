"use client"

import * as React from 'react';
import clsx from "clsx";
import * as Slot from '@radix-ui/react-slot'

import { forkRefs } from '@/lib/utils/forkRef';

import heroStyle from './sticky-hero.module.css'

const StickyHero = React.forwardRef<HTMLDivElement, Slot.SlotProps & { asChild?: boolean }>(
    function StickyHero({ className, asChild = false, children, style, ...others }, ref) {
        const Comp = asChild ? Slot.Root : 'div';
        const localRef = React.useRef<HTMLDivElement>(undefined);

        return (
            <Comp className={clsx(heroStyle.StickyHero, className)}
                style={{
                    ...style,
                    "--size-hero-height": `${localRef.current?.clientHeight}px`
                } as React.CSSProperties}
                {...others} ref={forkRefs(localRef, ref)}>
                {children}
            </Comp>
        );
    }
)

export default StickyHero;
