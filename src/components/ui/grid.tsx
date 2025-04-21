import * as React from 'react';
import clsx from "clsx";

import gridStyle from './grid.module.css'

const Grid = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { columns: number }>(
    function Grid({ className, columns, style, ...other }, ref) {
        return (
            <div className={clsx(className, gridStyle.Grid)}
                style={{ "--grid-columns-count": columns, ...style } as React.CSSProperties}
                ref={ref} {...other} />
        )
    }
)

export default Grid;
