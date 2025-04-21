import * as T from "@/components/ui/typography";

import style from './extending-button.module.css'
import clsx from "clsx";

export default function ExtendingButton({ label }: { label: string }) {
    return (
        <T.Body1 className={clsx(style.ExtendingButtonTypography, style.HoverContext)}>
            {label}
            <span className={style.ExtendingButtonMark}>{">>"}</span>
        </T.Body1>
    )
}

ExtendingButton.hoverContext = style.HoverContext;