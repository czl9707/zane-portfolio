import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";

import { twMerge } from "@/lib/utils/tw-merge";

import React from "react";


export default function ContentSection({ children, header, className }: {
    children?: React.ReactNode,
    header?: React.ReactNode,
    className?: string
}) {
    return (
        <Container.FullWidth className={
            twMerge("bg-background", className)
        }>
            <Divider />
            <Grid.ColFour className="py-group">
                <SlideUp.Div className="col-span-1">
                    <div className="sticky top-header pb-paragraph">
                        {header}
                    </div>
                </SlideUp.Div>

                {children}
            </Grid.ColFour>
        </Container.FullWidth >
    )
}
