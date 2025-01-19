import * as React from "react"
import { twMerge } from "tailwind-merge"


const ColThree1Grid = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ColThree1Grid({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={
            twMerge('grid md:grid-cols-3 grid-cols-1 gap-4 relative', className)
        } />
    }
)

export {
    ColThree1Grid as ColThree
}