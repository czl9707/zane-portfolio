import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import * as Markdown from "@/components/ui/markdown";
import Spacer from "@/components/ui/spacer";
import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import SlidingDownIcon from "@/components/ui/sliding-down-icon";
import StickyHero from "@/components/layout/sticky-hero";
import * as Container from "@/components/ui/container";

import * as AboutMe from "@/lib/cms/zane-about-me"

import React from "react";
import { Metadata } from "next";


export const revalidate = 14400;

export default async function Page() {
    const content = await AboutMe.getContents();

    return <>
        <StickyHero asChild style={{ display: "flex", flexDirection: "column" }}>
            <Container.FullWidth >
                <Spacer style={{ flex: "1 1" }} />
                <SlidingDownIcon />
                <Spacer />

                <Grid columns={3}>
                    <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                        <T.H4 asElement="h2">
                            Hi, I am Zane Chen! <br />
                            A Self-Taught Software Engineer.
                        </T.H4>
                    </SlideUp.Div>
                </Grid>
            </Container.FullWidth>
        </StickyHero>

        <ContentSection header={
            <T.H5 asElement="h1" style={{ opacity: .75 }}>About Zane</T.H5>
        }>
            <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                <Markdown.LinkHighlight>
                    {content.aboutMe}
                </Markdown.LinkHighlight>
            </SlideUp.Div>
        </ContentSection>


        <TitleSection noDivider>
            <TitleSection.Heading>My Timeline</TitleSection.Heading>
        </TitleSection>
        {
            content.timeline.sort((ex1, ex2) => ex2.year[0] - ex1.year[0]).map((ex, i) => (
                <ContentSection key={i} header={
                    <T.H5 style={{ opacity: .75 }}>{ex.year.join(" - ")}</T.H5>
                }>
                    <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                        <Markdown.LinkHighlight>
                            {ex.experience}
                        </Markdown.LinkHighlight>
                    </SlideUp.Div>
                </ContentSection>
            ))
        }

    </>
}

export const metadata: Metadata = {
    title: "Zane Chen - About Me",
    description: "Zane Chen is a self-taught architect turned Software Engineer working for Bloomberg LP, who enjoy building solutions one block at a time.",
};