import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import Spacer from "@/components/ui/spacer";
import ArchitectureProjectCard from "@/components/arch-project/arch-project-brief";
import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import Button from "@/components/ui/button";
import BriefsContainer from '@/components/layout/briefs-container'
import * as Markdown from "@/components/ui/markdown";
import { solidBackground } from "@/components/ui/util";
import DevProjectBrief from "@/components/dev-project/dev-project-card";
import DevBlogBrief from "@/components/dev-blog/dev-blog-brief";
import SlidingDownIcon from "@/components/ui/sliding-down-icon";


import * as Homepage from "@/lib/cms/zane-homepage"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import Link from "next/link";
import React from "react";
import { styled, css } from "@pigment-css/react";
import ExtendingButton from "@/components/ui/extending-button";
import StickyHero from "@/components/layout/sticky-hero";


export const revalidate = 14400;


export default async function Page() {
  const content = await Homepage.getContents();

  return (
    <>
      <IntroSection />
      <WhoAmISection content={content.whoAmI} />
      <DeveloperSection projects={content.featuredDevProjects} blogs={content.featuredBlogs} />
      <ArchitectSection projects={content.featuredArchProjects} />

      <Container.FullWidth className={solidBackground}>
        <FullWidthName />
      </Container.FullWidth>
    </>
  );
}


function IntroSection() {
  return (
    <StickyHero>
      <Grid columns={3}>
        <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
          <T.H4>
            Precision in detail, vision in design, <br />
            building things one block at a time.
          </T.H4>
        </SlideUp.Div>
      </Grid>

      <Spacer style={{ flex: "1 1" }} />
      <SlidingDownIcon />
      <Spacer />
      <FullWidthName style={{ bottom: 0, top: "auto" }} />
    </StickyHero>
  )
}

const SVGText = styled("text")(({ theme }) => ({
  fill: `rgb(${theme.vars.color.default.foreground})`,
  fontFamily: theme.typographies.h1.fontFamily, userSelect: "none",
}))

const FullWidthName = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function FullWidthName({ className, ...others }, ref) {
    return (
      <SlideUp.Div {...others} ref={ref} className={[solidBackground, className].join(" ")}>
        <svg width={"100%"} viewBox="0 0 45 8">
          <SVGText x="50%" y="50%" width={45} fontSize={"8px"} fontWeight={700}
            dominantBaseline="middle" textAnchor="middle"
          >
            ZANE CHEN
          </SVGText>
        </svg>
      </SlideUp.Div>
    );
  }
)


function WhoAmISection({ content }: { content: string }) {
  return (
    <ContentSection
      header={
        <T.H5 style={{ opacity: 0.75 }} id="who_am_i">Who am I?</T.H5>
      }
    >
      <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
        <Markdown.LinkHighlight>
          {content}
        </Markdown.LinkHighlight>
      </SlideUp.Div>
    </ContentSection>
  )
}


function DeveloperSection({ projects, blogs = [] }: { projects: ZaneDevProject.Info[], blogs: ZaneDevBlog.Info[] }) {
  return (
    <>
      <TitleSection>
        <TitleSection.Heading id="as_a_developer">NOW A SOFTWARE ENGINEER</TitleSection.Heading>
      </TitleSection>

      <ContentSection style={{ paddingTop: 0 }}
        header={
          <T.H5 style={{ opacity: 0.75 }}>Featured Projects</T.H5>
        }
      >
        <BriefsContainer style={{ gridColumn: "span 3 / span 3" }}>
          {
            projects.map((project) => (
              <DevProjectBrief project={project} key={project.title} />
            ))
          }
          <Link href={"/as/developer/project"}>
            <SlideUp.Div style={{ paddingTop: "6rem" }} className={ExtendingButton.hoverContext}>
              <ExtendingButton label="All Projects" />
            </SlideUp.Div>
          </Link>
        </BriefsContainer>

      </ContentSection>

      <ContentSection style={{ paddingTop: 0 }}
        header={<T.H5 style={{ opacity: 0.75 }}>Featured Blogs</T.H5>}
      >
        <BriefsContainer style={{ gridColumn: "span 3 / span 3" }}>
          {
            blogs.map((blog) => (
              <DevBlogBrief blog={blog} key={blog.title} />
            ))
          }
          <Link href={"/as/developer/blog"}>
            <SlideUp.Div style={{ paddingTop: "3rem" }} className={ExtendingButton.hoverContext}>
              <ExtendingButton label="All Blogs" />
            </SlideUp.Div>
          </Link>
        </BriefsContainer>
      </ContentSection>
    </>
  )
}


async function ArchitectSection({ projects }: { projects: ZaneArchProject.Info[] }) {
  return (
    <>
      <TitleSection>
        <div className={css(({ theme }) => ({
          display: "flex", flexDirection: "column", width: "100%", alignItems: "stretch",
          [`@media(min-width: ${theme.breakpoint.md})`]: { flexDirection: "row", alignItems: "flex-end" },
        }))}>
          <TitleSection.Heading id="as_an_architect" >ONCE AN ARCHITECT</TitleSection.Heading>
          <Link href={"/as/architect/project"} style={{ flex: "1 1" }}
            className={ExtendingButton.hoverContext}>
            <ExtendingButton label="All Projects" />
          </Link>
        </div>
      </TitleSection >

      <Container.FullWidth className={solidBackground}>
        <Divider />
        <Spacer />
        <Grid columns={2}>
          {
            projects.map(project => (
              <ArchitectureProjectCard project={project} key={project.title} />
            ))
          }
        </Grid>
        <Spacer />
      </Container.FullWidth>

      <Container.FullWidth className={solidBackground}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SlideUp.Div >
          <Link href="/as/architect/project">
            <Button variant="outline">
              View All Projects
            </Button>
          </Link>
        </SlideUp.Div>
        <Spacer />
      </Container.FullWidth>
    </>
  )
}
