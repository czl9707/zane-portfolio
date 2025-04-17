import * as React from 'react';
import clsx from "clsx";

import style from './grid.module.css'

const Grid = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { columns: number }>(
    function Grid({ className, columns, ...other }, ref) {
        return (
            <div className={clsx(className, style.Grid)}
                style={{ "--grid-columns-count": columns } as React.CSSProperties}
                ref={ref} {...other} />
        )
    }
)

export default Grid;
