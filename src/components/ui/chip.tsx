import * as React from 'react';

import clsx from 'clsx';
import chipStyle from './chip.module.css';

const Chip = React.forwardRef<
    HTMLSpanElement, 
    React.HTMLProps<HTMLSpanElement>
>(
    function Chip({ className, children, ...other }, ref) {
        return (
            <span className={clsx(className, chipStyle.Chip)} ref={ref} {...other}>
                {children}
            </span>
        )
    }
) as unknown as React.FC<React.HTMLProps<HTMLSpanElement>> & {
    Container: React.FC<React.HTMLProps<HTMLDivElement>>
};

const ChipContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ChipContainer({ className, children, ...other }, ref) {
        return (
            <div className={clsx(className, chipStyle.ChipContainer)} ref={ref} {...other}>
                {children}
            </div>
        )
    }
)

Chip.Container = ChipContainer;

export default Chip;
