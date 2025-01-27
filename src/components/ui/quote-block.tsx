import * as React from "react";
import { twMerge } from "@/lib/utils/tw-merge";


const QuoteBlock = React.forwardRef<HTMLQuoteElement, React.HTMLProps<HTMLQuoteElement>>(
    function QuoteBlock({ className, children, ...others }, ref) {
        return <blockquote className={twMerge("border-l-4 border-foreground/25 pt-paragraph pl-component mb-paragraph", className)}
            {...others} ref={ref}>
            <i>
                {children}
            </i>
        </blockquote>
    }
)

export default QuoteBlock;