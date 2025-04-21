import * as T from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import * as SlideUp from "@/components/ui/slideup-effect";
import StickyHero from "@/components/layout/sticky-hero";
import Spacer from "@/components/ui/spacer";
import * as Container from "@/components/ui/container"

import { Metadata } from 'next';

export const revalidate = 14400;


export default async function NotFound() {
    return (
        <StickyHero asChild style={{ display: "flex", flexDirection: "column" }}>
            <Container.FullWidth>
                <Spacer style={{ flex: "1 1" }} />

                <Grid columns={3}>
                    <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                        <T.H4>
                            Visiting somewhere in the furture. <br />
                            {"404! Time Machine's broken!"}
                        </T.H4>
                    </SlideUp.Div>
                </Grid>
            </Container.FullWidth>
        </StickyHero>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - 404",
    description: "Visiting somewhere in the furture, but Time Machine's broken!",
};