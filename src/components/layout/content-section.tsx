import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import { themeVars } from "@/lib/theme";

import React from "react";
import style from './content-section.module.css'


const ContentSection = React.forwardRef<
    HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { header?: React.ReactNode }
>(
    function ContentSection({ children, header, className, ...other }, ref) {
        return (
            <Container.FullWidth {...other} className={className} ref={ref}
                style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
                <Divider />
                <Grid columns={4} className={style.ContentGrid}>
                    <SlideUp.Div style={{ gridColumn: "span 1 / span 1" }}>
                        <div className={style.ContentContainer}>
                            {header}
                        </div>
                    </SlideUp.Div>

                    {children}
                </Grid>
            </Container.FullWidth >
        )
    }
)

export default ContentSection;
