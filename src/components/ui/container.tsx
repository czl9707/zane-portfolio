import * as React from 'react'
import { twMerge } from "@/lib/utils/tw-merge";

const FullContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function FullContainer({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('sm:px-group px-component relative', className)
        } />
    }
)

export {
    FullContainer as FullWidth,
};