import * as React from 'react';

import clsx from 'clsx';
import chipStyle from './chip.module.css';
import { ColorVariation } from '@/lib/theme';

type ChipColorVariation = Exclude<ColorVariation, 'default'>;

const Chip = React.forwardRef<
    HTMLSpanElement,
    React.HTMLProps<HTMLSpanElement> & { color?: ChipColorVariation }
>(
    function Chip({ className, children, color = "secondary", style, ...other }, ref) {
        return (
            <span className={clsx(className, chipStyle.Chip)} ref={ref} {...other}
                style={{ "--chip-color": `var(--color-${color}-foreground)`, ...style } as React.CSSProperties}>
                {children}
            </span>
        )
    }
) as unknown as React.FC<React.HTMLProps<HTMLSpanElement> & { color?: ChipColorVariation }> & {
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
