import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";

import React from "react";
import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import StyledMarkdown from "@/components/ui/styled-markdown";
import { Metadata } from "next";


const experience = [
    {
        year: 2022,
        content: `
- Got my Master of Architecture from UC Berkeley.
- Married with my wife.
- Joined Bloomberg LP as an entry level software engineer.
- Moved to NYC.
`
    },
    {
        year: 2023,
        content: `
- Gaining Idea about pytest-asyncio-concurrent.
`
    }
]

export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
    return [{}]
}

export default function Page() {
    return <>
        <Container.FullWidth className="mt-header">
            <Grid.ColThree>
                <SlideUp.Div className="col-span-2">
                    <T.H4>
                        Hi, I am Zane Chen! <br />
                        A Self-Taught Software Engineer.
                    </T.H4>
                </SlideUp.Div>
            </Grid.ColThree>

        </Container.FullWidth>
        <TitleSection noDivider>
            <T.H2>About Me</T.H2>
        </TitleSection>

        <ContentSection>
            <div className={"col-span-2"}>
                <SlideUp.Div>
                    <T.H6>
                        Once an Architect, now a self-taught Software Engineer working for Bloomberg LP, I enjoy building solutions, one block at a time.
                        <br /><br />
                        Outside of working, I spend time with family, I workout, and I build things for fun.
                        <br /><br />
                        Althought I am no longer doing architecture, I am still obsessed with elegant graphics.
                    </T.H6>
                </SlideUp.Div>
            </div>
        </ContentSection>


        <TitleSection noDivider>
            <T.H2>My Timeline</T.H2>
        </TitleSection>
        {
            experience.sort((ex1, ex2) => ex2.year - ex1.year).map((ex, i) => (
                <ContentSection key={i} header={
                    <T.H5 className="text-foreground/75">{ex.year}</T.H5>
                }>
                    <div className={"col-span-2"}>
                        <SlideUp.Div>
                            <StyledMarkdown>
                                {ex.content}
                            </StyledMarkdown>
                        </SlideUp.Div>
                    </div>
                </ContentSection>
            ))
        }

    </>
}

export const metadata: Metadata = {
    title: "Zane Chen - About Me",
    description: "Zane Chen is a self-taught architect turned Software Engineer working for Bloomberg LP, who enjoy building solutions one block at a time.",
};