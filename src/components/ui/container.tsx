import * as React from 'react'
import { twMerge } from 'tailwind-merge';

const Container = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function Container({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('max-w-7xl w-[calc(100vw-10rem)] mx-auto', className)
        } />
    }
)


export default Container;