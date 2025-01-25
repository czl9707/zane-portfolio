import * as React from 'react'
import { twMerge } from 'tailwind-merge';

const CenteredContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function CenteredContainer({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('max-w-6xl w-full mx-auto px-20 relative', className)
        } />
    }
)

const FullContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function FullContainer({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('px-group relative', className)
        } />
    }
)

export {
    CenteredContainer as Default,
    FullContainer as FullWidth,
};