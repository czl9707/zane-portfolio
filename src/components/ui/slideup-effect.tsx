"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import * as Container from '@/components/ui/container'
import { css, keyframes } from '@pigment-css/react'

const slideUpEffect = keyframes({
    from: { transform: "translateY(min(5rem, 100%))", opacity: "0", },
    to: { transform: "none", opacity: "1", },
})

const slideUp = css(({ theme }) => ({
    animation: `${slideUpEffect} ${theme.transition.long}`,

    animationPlayState: "paused",
    "&[data-entered=true]": { animationPlayState: "running" },
}));

function slideUpFactory(Comp: React.ElementType<React.HTMLProps<HTMLDivElement>>) {
    return React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { delay?: number }>(
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

export {
    SlideUpFullWidthContainer as FullWidth,
    SlideUpDiv as Div,
    slideUpEffect as effect,
    slideUpFactory as factory,
}