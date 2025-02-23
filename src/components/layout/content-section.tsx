import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import Spacer from "@/components/ui/spacer";
import { solidBackground } from "@/components/ui/util";

import React from "react";


export default function ContentSection({ children, header, className }: {
    children?: React.ReactNode,
    header?: React.ReactNode,
    className?: string
}) {
    return (
        <Container.FullWidth className={[solidBackground, className].join(" ")}>
            <Divider />
            <Grid columns={4} className="py-group">
                <SlideUp.Div style={{ gridColumn: "span 1 / span 1" }}>
                    <div className="sticky top-header pb-paragraph">
                        {header}
                    </div>
                </SlideUp.Div>

                {children}
            </Grid>
        </Container.FullWidth >
    )
}
