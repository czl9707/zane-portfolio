"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

import * as Container from '@/components/ui/container'

type DelayVariant = 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;

export function SlideUpFactory(Comp: React.ElementType<React.HTMLProps<HTMLDivElement>>) {
    return React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { delay?: DelayVariant }>(
        function SlideUpContainer({ className, delay = 0, ...other }, ref) {
            const { ref: inviewRef, inView, entry } = useInView({ threshold: 0.05 })
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
                }}
                    className={twMerge(
                        `animate-[slide-up_1s_ease-out_both] delay-${delay} animate-paused`,
                        className,
                    )} {...other} />
            )
        }
    )
}


const SlideUpFullWidthContainer = SlideUpFactory(Container.FullWidth);
const SlideUpDefaultContainer = SlideUpFactory(Container.Default);
const SlideUpDiv = SlideUpFactory('div');

export {
    SlideUpFullWidthContainer as FullWidth,
    SlideUpDefaultContainer as Container,
    SlideUpDiv as Div,
}