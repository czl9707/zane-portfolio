import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import ArchitectureProjectCard from "@/components/arch-project/arch-project-card";
import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import Button from "@/components/ui/button";
import ProjectBlogBriefSession from "@/components/layout/project-blog-brief-session";
import * as StyledMarkdown from "@/components/ui/styled-markdown";

import * as Homepage from "@/lib/cms/zane-homepage"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import Link from "next/link";
import React from "react";
import DevProjectCard from "@/components/dev-project/dev-project-card";
import DevBlogCard from "@/components/dev-blog/dev-blog-card";
import SlidingDownIcon from "@/components/ui/sliding-down-icon";
import { css, styled } from "@pigment-css/react";

export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
  return [{}];
}

const SolidBackground = css(({ theme }) => ({ background: `rgb(${theme.vars.color.default.background})` }));

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
  height: "100vh", paddingTop: theme.size.header, position: "sticky", top: 0,
  display: "flex", flexDirection: "column",
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
  fontFamily: theme.typographies.h1.fontFamily,
  fontSize: "8",
  userSelect: "none",
}))

const FullWidthName = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function FullWidthName({ className, ...others }, ref) {
    return (
      <Container.FullWidth {...others} ref={ref} className={[SolidBackground, className].join(" ")}>
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
  const BlogCardHeight = "min-h-20";
  const ProjCardHeight = "min-h-28";

  return (
    <>
      <TitleSection>
        <T.H2 id="as_a_developer">NOW A SOFTWARE ENGINEER</T.H2>
      </TitleSection>

      <ContentSection
        header={
          <T.H5 style={{ opacity: 0.75 }}>Featured Projects</T.H5>
        }
      >
        <div style={{ gridColumn: "span 3 / span 3" }}
          className="-mt-group">
          {
            projects.map((project) => (
              <DevProjectCard project={project} key={project.title} />
            ))
          }
          <Link href={"/as/developer/project"}>
            <ProjectBlogBriefSession buttonText="All Projects" noDivider>
              <div className={`${ProjCardHeight}`} />
            </ProjectBlogBriefSession>
          </Link>
        </div>

      </ContentSection>

      <ContentSection
        header={<T.H5 style={{ opacity: 0.75 }}>Featured Blogs</T.H5>}
      >
        <div style={{ gridColumn: "span 3 / span 3" }}
          className="-mt-group">
          {
            blogs.map((blog) => (
              <DevBlogCard blog={blog} key={blog.title} />
            ))
          }
          <Link href={"/as/developer/blog"}>
            <ProjectBlogBriefSession buttonText="All Blogs" noDivider>
              <div className={`${BlogCardHeight}`} />
            </ProjectBlogBriefSession>
          </Link>
        </div>
      </ContentSection>
    </>
  )
}


async function ArchitectSection({ projects }: { projects: ZaneArchProject.Info[] }) {
  return (
    <>
      <TitleSection>
        <div className="flex lg:flex-row flex-col w-full">
          <T.H2 id="as_an_architect">ONCE AN ARCHITECT</T.H2>
          <Link href={"/as/architect/project"} className="flex-1">
            <ProjectBlogBriefSession buttonText="All Projects" noDivider />
          </Link>
        </div>
      </TitleSection >

      <Container.FullWidth className={SolidBackground}>
        <Divider />
        <Grid columns={2} className="py-group">
          {
            projects.map(project => (
              <ArchitectureProjectCard project={project} key={project.title} />
            ))
          }
        </Grid>
      </Container.FullWidth>

      <Container.FullWidth className={SolidBackground}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SlideUp.Div >
          <Link href="/as/architect/project">
            <Button variant="outline">
              <T.Button>View All Projects</T.Button>
            </Button>
          </Link>
        </SlideUp.Div>
        <Spacer />
      </Container.FullWidth>
    </>
  )
}

const Spacer = styled('span')(({ theme }) => ({
  height: theme.spacing.group, display: "block", userSelect: "none",
}));

