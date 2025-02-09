import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import * as StyledMarkdown from "@/components/ui/styled-markdown";

import * as AboutMe from "@/lib/cms/zane-about-me"

import React from "react";
import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import { Metadata } from "next";
import SlidingDownIcon from "@/components/ui/sliding-down-icon";


export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}

export default async function Page() {
    const content = await AboutMe.getContents();

    return <>
        <Container.FullWidth className="pt-header pb-component h-screen flex flex-col top-0 sticky">
            <span className="block select-none flex-1" />

            <SlidingDownIcon className="mb-group" />

            <Grid.ColThree>
                <SlideUp.Div className="col-span-2">
                    <T.H4>
                        Hi, I am Zane Chen! <br />
                        A Self-Taught Software Engineer.
                    </T.H4>
                </SlideUp.Div>
            </Grid.ColThree>
        </Container.FullWidth>

        <ContentSection header={
            <T.H5 className="text-foreground/75">About Zane</T.H5>
        }>
            <SlideUp.Div className={"col-span-2"}>
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
                    <T.H5 className="text-foreground/75">{ex.year.join(" - ")}</T.H5>
                }>
                    <SlideUp.Div className={"col-span-2"}>
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