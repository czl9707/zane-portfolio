import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import ArchitectureProjectCard from "@/components/arch-project/arch-project-card";
import TitleSection from "@/components/layout/title-section";
import Button from "@/components/ui/button";
import ProjectBlogBriefSession from "@/components/layout/project-blog-brief-session";

import * as Homepage from "@/lib/cms/zane-homepage"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import "./page.css"
import Link from "next/link";
import React from "react";
import DevProjectCard from "@/components/dev-project/dev-project-card";
import DevBlogCard from "@/components/dev-blog/dev-blog-card";
import ContentSection from "@/components/layout/content-section";

export const revalidate = 14400;

export async function generateStaticParams(): Promise<object[]> {
  return [{}];
}

export default async function Page() {
  const content = await Homepage.getContents();

  return (
    <>
      <IntroSection />
      <WhoAmISection />
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

function WhoAmISection() {
  return (
    <ContentSection className="group/section"
      header={
        <T.H5 className="text-foreground/75" id="who_am_i">Who am I?</T.H5>
      }
    >
      <div className={"col-span-2"}>
        <SlideUp.Div>
          <T.H4 className="group-hover/section:text-foreground/50 transition-colors duration-500">
            Once an
            <Link className="text-foreground" href="#as_an_architect"> <u>Architect</u></Link>, now a self-taught
            <Link className="text-foreground" href="#as_a_developer"> <u>Software Engineer</u></Link>, I enjoy building solutions.
          </T.H4>
          <Spacer />
          <T.Body1 className="group-hover/section:text-foreground/50 transition-colors duration-500">
            Currently I am working at
            <Link className="text-foreground" href="https://www.bloomberg.com/professional"> <u>Bloomberg</u> </Link> as a software engineer, while I keep building
            side projects outside of work to keep myself sharp. Before transitioning into tech, I received 7-year architect training,
            worked on projects spanning from individual housing designs to large-scale urban planning.
            Living at the crossroads of diverse cultures and domains, I embrace the richness of multiple perspectives.
          </T.Body1>
        </SlideUp.Div>

        <Spacer />

        <SlideUp.Div>
          <T.H5>
            As a Software Engineer
          </T.H5>

          <T.Body1 className="group-hover/section:text-foreground/50 transition-colors duration-500">
            I thrive on building seamless solutions, bridging gaps in technologies with innovative ideas.
            My side projects and blogs serve as platforms to explore new tools, document what I learn, and share solutions to challenges.
          </T.Body1>
        </SlideUp.Div>

        <Spacer />

        <SlideUp.Div>
          <T.H5>
            Once an Architect
          </T.H5>

          <T.Body1 className="group-hover/section:text-foreground/50 transition-colors duration-500">
            Being an architect turned developer is a rewarding journey—architecture nurtured my systematic and aesthetic thinking,
            while coding empowers me to bring those ideas to life and make a broader impact efficiently.
          </T.Body1>
        </SlideUp.Div>
      </div>

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
            <ProjectBlogBriefSession buttonText="All Projects" withDivider={false}>
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
            <ProjectBlogBriefSession buttonText="All Blogs" withDivider={false}>
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
            <ProjectBlogBriefSession buttonText="All Projects" withDivider={false} />
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
