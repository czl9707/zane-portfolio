import { themeVars, SpacingVariation } from '@/lib/theme';

import * as React from 'react';
import clsx from "clsx";

import style from './spacer.module.css'

const Spacer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & {
    direction?: 'vertical' | 'horizontal',
    spacing?: SpacingVariation
}>(
    function Spacer({ className, direction = 'horizontal', spacing = "group", ...other }, ref) {
        return (
            <span className={clsx(className, style.SpacerBase)} style={{
                width: direction === 'vertical' ? themeVars.spacing[spacing] : undefined,
                height: direction === 'horizontal' ? themeVars.spacing[spacing] : undefined,
            }}
                ref={ref} {...other} />
        )
    }
)

export default Spacer;