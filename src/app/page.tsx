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
import ProjectBlogBrief from "@/components/layout/project-blog-brief";
import BriefsContainer from '@/components/layout/briefs-container'
import * as StyledMarkdown from "@/components/ui/styled-markdown";
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


export const revalidate = 14400;
export async function generateStaticParams(): Promise<object[]> {
  return [{}];
}


export default async function Page() {
  const content = await Homepage.getContents();

  return (
    <>
      <IntroSection />
      <WhoAmISection content={content.whoAmI} />
      <DeveloperSection projects={content.featuredDevProjects} blogs={content.featuredBlogs} />
      <ArchitectSection projects={content.featuredArchProjects} />
      <FullWidthName />
    </>
  );
}


const IntroSectionContainer = styled("div")(({ theme }) => ({
  height: "100vh", paddingTop: theme.size.header.height, position: "sticky", top: 0,
  display: "flex", flexDirection: "column", boxSizing: "border-box"
}))

function IntroSection() {
  return (
    <IntroSectionContainer>
      <Container.FullWidth>
        <Grid columns={3}>
          <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
            <T.H4>
              Precision in detail, vision in design, <br />
              building things one block at a time.
            </T.H4>
          </SlideUp.Div>
        </Grid>
      </Container.FullWidth>

      <Spacer style={{ flex: "1 1" }} />
      <SlidingDownIcon />
      <Spacer />
      <FullWidthName style={{ display: "sticky", bottom: "0", top: "auto" }} />
    </IntroSectionContainer>
  )
}

const FullWidthText = styled("text")(({ theme }) => ({
  fill: `rgb(${theme.vars.color.default.foreground})`,
  fontFamily: theme.typographies.h1.fontFamily, fontWeight: 700,
  fontSize: "8px",
  userSelect: "none",
}))

const FullWidthName = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function FullWidthName({ className, ...others }, ref) {
    return (
      <Container.FullWidth {...others} ref={ref} className={[solidBackground, className].join(" ")}>
        <SlideUp.Div>
          <svg width={"100%"} viewBox="0 0 45 8">
            <FullWidthText x="50%" y="50%"
              dominantBaseline="middle" textAnchor="middle"
            >
              ZANE CHEN
            </FullWidthText>
          </svg>
        </SlideUp.Div>
      </Container.FullWidth>
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
        <StyledMarkdown.LinkHighlight>
          {content}
        </StyledMarkdown.LinkHighlight>
      </SlideUp.Div>
    </ContentSection>
  )
}

function DeveloperSection({ projects, blogs = [] }: { projects: ZaneDevProject.Info[], blogs: ZaneDevBlog.Info[] }) {
  return (
    <>
      <TitleSection>
        <T.H2 id="as_a_developer">NOW A SOFTWARE ENGINEER</T.H2>
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
            <ProjectBlogBrief buttonText="All Projects" noDivider>
              <Spacer style={{ minHeight: "8rem" }} />
            </ProjectBlogBrief>
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
            <ProjectBlogBrief buttonText="All Blogs" noDivider>
              <Spacer style={{ minHeight: "5rem" }} />
            </ProjectBlogBrief>
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
          display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-end",
          [`@media(min-width: ${theme.breakpoint.md})`]: { flexDirection: "row" },
        }))}>
          <T.H2 id="as_an_architect">ONCE AN ARCHITECT</T.H2>
          <Link href={"/as/architect/project"} style={{ flex: "1 1" }}>
            {/* working around the button, should seperate button with main components later */}
            <ProjectBlogBrief buttonText="All Projects" noDivider />
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
