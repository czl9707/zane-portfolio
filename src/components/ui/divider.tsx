import * as React from 'react';
import { twMerge } from "@/lib/utils/tw-merge";

const Divider = React.forwardRef<HTMLSpanElement, React.HTMLProps<HTMLDivElement>>(
    function Divider({ className, ...others }, ref) {
        return <span className={twMerge('block w-full border-t border-foreground/50', className)} {...others} ref={ref} />
    }
)

export default Divider;