import * as SlideUp from "@/components/ui/slideup-effect";
import Grid from "@/components/ui/grid";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

import cardStyle from './card.module.css'

const CardBase = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    href: string,
    target?: React.HTMLAttributeAnchorTarget,
    columns?: number,
    rows?: number,
}>(
    function CardBase({ className, children, href, target, columns, rows, ...other }, ref) {
        return (
            <Link href={href} target={target} className={cardStyle.Card}
                style={{ "--card-columns": columns, "--card-rows": rows, } as React.CSSProperties}>
                <SlideUp.Div className={className} {...other} ref={ref}>
                        {children}
                </SlideUp.Div>
            </Link>
        )
    }
)

const OutlinedCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    href: string,
    target?: React.HTMLAttributeAnchorTarget,
    columns?: number,
    rows?: number,
}>(
    function OutlinedCard({ className, children, ...other }, ref) {
        return (
            <CardBase className={clsx(className, cardStyle.OutlinedCard)} {...other} ref={ref}>
                {children}
            </CardBase>
        )
    }
)

const CardContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {columns?: number}>(
    function CardContainer({ children, columns = 2, ...other }, ref) {
        return (
            <Grid columns={columns} className={cardStyle.CardContainerGrid} {...other} ref={ref}>
                {children}
            </Grid>
        )
    }
)

export {
    CardBase as Base,
    OutlinedCard as Outlined,
    CardContainer as Container,
};

