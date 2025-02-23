import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import { solidBackground } from "@/components/ui/util";

import React from "react";
import { css, styled } from "@pigment-css/react";

const ContentContainer = styled("div")(({ theme }) => ({
    position: "sticky", top: theme.size.header.height, paddingBottom: theme.spacing.paragraph
}))

export default function ContentSection({ children, header, className }: {
    children?: React.ReactNode,
    header?: React.ReactNode,
    className?: string
}) {
    return (
        <Container.FullWidth className={[solidBackground, className].join(" ")}>
            <Divider />
            <Grid columns={4} className={css(({ theme }) => ({
                paddingBottom: theme.spacing.group, paddingTop: theme.spacing.group,
            }))}>
                <SlideUp.Div style={{ gridColumn: "span 1 / span 1" }}>
                    <ContentContainer>
                        {header}
                    </ContentContainer>
                </SlideUp.Div>

                {children}
            </Grid>
        </Container.FullWidth >
    )
}
