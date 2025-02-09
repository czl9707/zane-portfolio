import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
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

import "./page.css"
import Link from "next/link";
import React from "react";
import DevProjectCard from "@/components/dev-project/dev-project-card";
import DevBlogCard from "@/components/dev-blog/dev-blog-card";

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


function IntroSection() {
  return (
    <div className="h-screen flex flex-col pt-header sticky top-0">
      <Container.FullWidth>
        <Grid.ColThree>
          <SlideUp.Div className="col-span-2">
            <T.H4>
              Precision in detail, vision in design, <br />
              building things one block at a time.
            </T.H4>
          </SlideUp.Div>
        </Grid.ColThree>
      </Container.FullWidth>

      <div className="flex-1" />

      <FullWidthName />
    </div>
  )
}

function FullWidthName() {
  return (
    <Container.FullWidth className="bg-background">
      <SlideUp.Div>
        <svg width={"100%"} viewBox="0 0 45 8">
          <text x="50%" y="50%"
            dominantBaseline="middle" textAnchor="middle"
            className="fill-foreground font-sans font-bold select-none"
            style={{ fontSize: "8" }}
          >
            ZANE CHEN
          </text>
        </svg>
      </SlideUp.Div>
    </Container.FullWidth>
  )
}

function WhoAmISection({ content }: { content: string }) {
  return (
    <ContentSection
      header={
        <T.H5 className="text-foreground/75" id="who_am_i">Who am I?</T.H5>
      }
    >
      <SlideUp.Div className={"col-span-2"}>
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

      <ContentSection className="group/section"
        header={
          <T.H5 className="text-foreground/75">Featured Projects</T.H5>
        }
      >
        <div className="col-span-3 -mt-group">
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

      <ContentSection className="group/section"
        header={<T.H5 className="text-foreground/75">Featured Blogs</T.H5>}
      >
        <div className="col-span-3 -mt-group">
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

      <Container.FullWidth className="bg-background">
        <Divider />
        <Grid.ColTwo className="py-group">
          {
            projects.map(project => (
              <ArchitectureProjectCard project={project} key={project.title} />
            ))
          }
        </Grid.ColTwo>
      </Container.FullWidth>

      <Container.FullWidth className="bg-background flex flex-col items-center">
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


function Spacer() {
  return <span className="h-group block select-none" />
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SlidingIcon({ className }: { className?: string }) {
  return (
    <Container.FullWidth className={className}>
      <svg viewBox="0 0 100 300" width="2rem" height="6rem"
        className="m-auto stroke-foreground/50 stroke-[10]"
        strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="0,100 50,130 100,100" className="animate-[icon-scroll-down_3s_.3s_ease-in-out_infinite_backwards]" />
        <polyline points="0,150 50,180 100,150" className="animate-[icon-scroll-down_3s_ease-in-out_infinite_backwards]" />
      </svg>
    </Container.FullWidth>
  )
}
