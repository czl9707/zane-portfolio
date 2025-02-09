"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { twMerge } from "@/lib/utils/tw-merge";

import * as Container from '@/components/ui/container'

type DelayVariant = 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

export function SlideUpFactory(Comp: React.ElementType<React.HTMLProps<HTMLDivElement>>) {
    return React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { delay?: DelayVariant }>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function SlideUpContainer({ className, delay = 0, children, ...other }, ref) {
            const { ref: inviewRef, inView, entry } = useInView({ threshold: 0 })
            React.useEffect(
                () => {
                    if (inView) {
                        entry?.target.classList.remove("animate-paused");
                    }
                },
                // eslint-disable-next-line react-hooks/exhaustive-deps
                [inView]
            );

            return (
                <Comp ref={(node: HTMLDivElement | null) => {
                    inviewRef(node);
                    if (ref != null) {
                        if (typeof ref === 'function') ref(node);
                        else ref.current = node;
                    }
                }} className={twMerge(
                    `animate-slideUp animate-paused`,
                    className
                )} {...other}>
                    {children}
                </Comp>
            )
        }
    )
}


const SlideUpFullWidthContainer = SlideUpFactory(Container.FullWidth);
const SlideUpDiv = SlideUpFactory('div');

export {
    SlideUpFullWidthContainer as FullWidth,
    SlideUpDiv as Div,
}