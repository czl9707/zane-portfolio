"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { css, keyframes } from '@pigment-css/react'

import * as Container from '@/components/ui/container'
import Grid from '@/components/ui/grid'

const slideUpEffect = keyframes({
    from: { transform: "translateY(min(5rem, 100%))", opacity: "0", },
    to: { transform: "none", opacity: "1", },
})

const slideUp = css(({ theme }) => ({
    animation: `${slideUpEffect} ${theme.transition.long} cubic-bezier(0.75, 0, 0.25, 1)`,

    animationPlayState: "paused",
    "&[data-entered=true]": { animationPlayState: "running" },
}));

function slideUpFactory<Props = object>(Comp: React.ElementType<React.HTMLProps<HTMLDivElement>>) {
    return React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { delay?: number } & Props>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function SlideUpContainer({ className, delay = 0, children, ...other }, ref) {
            const { ref: inviewRef, inView } = useInView({ threshold: 0, triggerOnce: true })

            return (
                <Comp
                    ref={(node: HTMLDivElement | null) => {
                        inviewRef(node);
                        if (ref != null) {
                            if (typeof ref === 'function') ref(node);
                            else ref.current = node;
                        }
                    }}
                    className={[slideUp, className].join(" ")}
                    data-entered={inView}
                    {...other}>
                    {children}
                </Comp>
            )
        }
    )
}


const SlideUpFullWidthContainer = slideUpFactory(Container.FullWidth);
const SlideUpDiv = slideUpFactory('div');
const SlideUpGrid = slideUpFactory<{ columns: number }>(Grid);

export {
    SlideUpFullWidthContainer as FullWidth,
    SlideUpDiv as Div,
    SlideUpGrid as Grid,
    slideUpEffect as effect,
    slideUpFactory as factory,
}