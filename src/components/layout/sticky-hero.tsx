"use client"

import * as React from 'react';
import clsx from "clsx";
import * as Slot from '@radix-ui/react-slot'

import { forkRefs } from '@/lib/utils/forkRef';

import heroStyle from './sticky-hero.module.css'

const StickyHero = React.forwardRef<HTMLDivElement, Slot.SlotProps & { asChild?: boolean }>(
    function StickyHero({ className, asChild = false, children, style, ...others }, ref) {
        const Comp = asChild ? Slot.Root : 'div';
        const [height, setHeight] = React.useState<string>("100vh")
        const localRef = React.useRef<HTMLDivElement>(undefined);

        React.useEffect(() => {
            const ch = localRef.current?.clientHeight;
            setHeight(ch == undefined ? "100vh" : `${ch}px`);

            if (localRef.current) {
                const tgt = localRef.current;
                const observer = new ResizeObserver(() => {
                    setHeight(`${tgt.clientHeight}px`);
                });
                observer.observe(tgt);
                return () => observer.unobserve(tgt);
            }
        }, [localRef])

        return (
            <Comp className={clsx(heroStyle.StickyHero, className)}
                style={{
                    ...style,
                    "--size-hero-height": height
                } as React.CSSProperties}
                {...others} ref={forkRefs(localRef, ref)}>
                {children}
            </Comp>
        );
    }
)

export default StickyHero;
