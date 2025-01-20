import * as React from "react"
import { twMerge } from "tailwind-merge"


const ColFourGrid = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ColFourGrid({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('grid lg:grid-cols-4 grid-cols-1 gap-8 relative', className)
        } />
    }
)

const ColThreeGrid = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ColThreeGrid({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('grid lg:grid-cols-3 grid-cols-1 gap-8 relative', className)
        } />
    }
)

const ColTwoGrid = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ColTwoGrid({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('grid lg:grid-cols-2 grid-cols-1 gap-8 relative', className)
        } />
    }
)


export {
    ColTwoGrid as ColTwo,
    ColThreeGrid as ColThree,
    ColFourGrid as ColFour,
}