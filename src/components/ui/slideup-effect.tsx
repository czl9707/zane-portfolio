"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'

import * as Container from '@/components/ui/container'
import Grid from '@/components/ui/grid'
import { forkRefs } from '@/lib/utils/forkRef'

import style from './slideup-effect.module.css'

function slideUpFactory<Props extends object>(
    Comp: React.ElementType<React.HTMLProps<HTMLDivElement> & Props, 'div'>
) {
    return React.forwardRef<HTMLDivElement, { delay?: number } & React.HTMLProps<HTMLDivElement> & Props>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function SlideUpContainer({ className, delay = 0, children, ...other }, ref) {
            const { ref: inviewRef, inView } = useInView({ threshold: 0, triggerOnce: true })

            return (
                // @ts-expect-error Props issue
                <Comp className={clsx(style.SlideUpContainer, className)}
                    ref={forkRefs(inviewRef, ref)}
                    data-entered={inView}{...other}>
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
    slideUpFactory as factory,
}