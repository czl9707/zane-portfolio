import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import * as StyledMarkdown from "@/components/ui/styled-markdown";
import Spacer from "@/components/ui/spacer";

import * as AboutMe from "@/lib/cms/zane-about-me"

import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import SlidingDownIcon from "@/components/ui/sliding-down-icon";

import React from "react";
import { Metadata } from "next";
import { css } from "@pigment-css/react";


export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}

const headerContainer = css(({ theme }) => ({
    paddingTop: theme.size.header.height, paddingBottom: theme.spacing.component, height: "100vh",
    display: "flex", flexDirection: "column", top: 0, position: "sticky",
}))

export default async function Page() {
    const content = await AboutMe.getContents();

    return <>
        <Container.FullWidth className={headerContainer}>
            <Spacer spacing="paragraph" style={{ flex: "1 1" }} />
            <SlidingDownIcon />
            <Spacer spacing="group" />

            <Grid columns={3}>
                <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                    <T.H4>
                        Hi, I am Zane Chen! <br />
                        A Self-Taught Software Engineer.
                    </T.H4>
                </SlideUp.Div>
            </Grid>
        </Container.FullWidth>

        <ContentSection header={
            <T.H5 style={{ opacity: .75 }}>About Zane</T.H5>
        }>
            <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                <StyledMarkdown.LinkHighlight>
                    {content.aboutMe}
                </StyledMarkdown.LinkHighlight>
            </SlideUp.Div>
        </ContentSection>


        <TitleSection noDivider>
            <T.H2>My Timeline</T.H2>
        </TitleSection>
        {
            content.timeline.sort((ex1, ex2) => ex2.year[0] - ex1.year[0]).map((ex, i) => (
                <ContentSection key={i} header={
                    <T.H5 style={{ opacity: .75 }}>{ex.year.join(" - ")}</T.H5>
                }>
                    <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
                        <StyledMarkdown.LinkHighlight>
                            {ex.experience}
                        </StyledMarkdown.LinkHighlight>
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