
import * as React from 'react';
import clsx from "clsx";
import * as Slot from '@radix-ui/react-slot'

import headingStyle from './heading-with-tag.module.css'

const HeadingWithTag = React.forwardRef<HTMLHeadingElement, Slot.SlotProps>(
    function HeadingWithTag({ className, children, ...others }, ref) {
        return (
            <Slot.Root className={clsx(headingStyle.HeadingWithTag, className)}
                {...others} ref={ref}>
                {children}
            </Slot.Root>
        );
    }
)

export default HeadingWithTag;
