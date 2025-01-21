import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import ArchitectureProjectCard from "@/components/arch-project/arch-project-card";

import * as Homepage from "@/lib/cms/zane-homepage"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import "./page.css"
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import React from "react";
import StyledMarkdown from "@/components/ui/styled-markdown";

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
    </>
  );
}


function IntroSection() {
  return (
    <div className="h-screen flex flex-col pt-24 pb-8 sticky top-0">
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

      <SlideUp.FullWidth >
        <svg width={"100%"} viewBox="0 0 45 8">
          <text x="50%" y="50%"
            dominantBaseline="middle" textAnchor="middle"
            className="fill-foreground font-sans font-bold select-none"
            style={{ fontSize: "8" }}
          >
            ZANE CHEN
          </text>
        </svg>
      </SlideUp.FullWidth>
    </div>
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
          <T.H4 className="mb-12 group-hover/section:text-foreground/50 transition-colors duration-500">
            Once an
            <Link className="text-foreground" href="#as_an_architect"> <u>Architect</u></Link>, now a self-taught
            <Link className="text-foreground" href="#as_a_developer"> <u>Software Engineer</u></Link>, I enjoy building solutions.
          </T.H4>

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
          <T.H5 className="mb-4">
            As a Software Engineer
          </T.H5>

          <T.Body1 className="group-hover/section:text-foreground/50 transition-colors duration-500">
            I thrive on building seamless solutions, bridging gaps in technologies with innovative ideas.
            My side projects and blogs serve as platforms to explore new tools, document what I learn, and share solutions to challenges.
          </T.Body1>
        </SlideUp.Div>

        <Spacer />

        <SlideUp.Div>
          <T.H5 className="mb-4">
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
        <div className="col-span-3 -mt-12">
          {
            projects.map((project) => (
              <Link href={project.externalLink} key={project.title}>
                <ProjectBriefSession buttonText="Take me there">
                  <T.H4 className={`mb-4 transition-color duration-500`}>{project.title}</T.H4>

                  <T.Body1 className="text-foreground/75">
                    {project.startDate.toLocaleString('US', { month: 'long', year: "numeric" })}
                    {
                      (project.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                      project.tags?.join(" · ")
                    }
                  </T.Body1>

                  <div className="text-foreground/75 pt-6">
                    <StyledMarkdown>
                      {project.description}
                    </StyledMarkdown>
                  </div>
                </ProjectBriefSession>
              </Link>
            ))
          }
          <ProjectBriefSession buttonText="All Projects" withDivider={false}>
            <div className={`${ProjCardHeight}`} />
          </ProjectBriefSession>
        </div>

      </ContentSection>

      <ContentSection className="group/section"
        header={<T.H5 className="text-foreground/75">Featured Blogs</T.H5>}
      >
        <div className="col-span-3 -mt-12">
          {
            blogs.map((blog) => (
              <Link href={`/as/developer/blog/${blog.title.replace(" ", "_")}`} key={blog.title}>
                <ProjectBriefSession buttonText="Read More">
                  <T.H4 className={`mb-4 transition-color duration-500`}>{blog.title}</T.H4>
                  <T.Body1 className="text-foreground/75">
                    {blog.createdDate.toLocaleString('US', { month: 'long', day: "2-digit", year: "numeric" })}
                    {
                      (blog.tags?.length ?? 0) > 0 ? " · " : ""
                    }
                    {
                      blog.tags?.join(" · ")
                    }
                  </T.Body1>
                </ProjectBriefSession>
              </Link>
            ))
          }
          <ProjectBriefSession buttonText="All Blogs" withDivider={false}>
            <div className={`${BlogCardHeight}`} />
          </ProjectBriefSession>
        </div>
      </ContentSection>
    </>
  )
}


async function ArchitectSection({ projects }: { projects: ZaneArchProject.Info[] }) {
  return (
    <>
      <TitleSection>
        <div className="lg:flex flex-row items-end">
          <T.H2 id="as_a_developer">ONCE AN ARCHITECT</T.H2>
          <div className="flex-1" />
          <T.H5 className="text-foreground/75" id="as_a_developer">Archived Archi Project</T.H5>
        </div>
      </TitleSection>

      <Container.FullWidth className="bg-background">
        <Divider />
        <Grid.ColTwo className="py-12">
          {
            projects.map(project => (
              <ArchitectureProjectCard project={project} key={project.title}
                href={`/as/architect/project/${project.title.replace(" ", "_")}`} />
            ))
          }
        </Grid.ColTwo>
      </Container.FullWidth>
    </>
  )
}


function TitleSection({ children, className }: {
  children?: React.ReactNode,
  className?: string
}) {
  return (
    <Container.FullWidth className={
      twMerge("bg-background", className)
    }>
      <Divider />

      {/* <SlidingIcon className="my-48" /> */}
      <div className="py-48" />
      <SlideUp.Div className="pb-12">
        {children}
      </SlideUp.Div>
    </Container.FullWidth>
  )
}


function ContentSection({ children, header, className }: {
  children?: React.ReactNode,
  header: React.ReactNode,
  className?: string
}) {
  return (
    <Container.FullWidth className={
      twMerge("bg-background", className)
    }>
      <Divider />
      <Grid.ColFour className="py-12">
        <SlideUp.Div className="col-span-1">
          <div className="sticky top-24">
            {header}
          </div>
        </SlideUp.Div>

        {children}
      </Grid.ColFour>

    </Container.FullWidth >
  )
}

function ProjectBriefSession({ children, buttonText, withDivider = true }: {
  children?: React.ReactNode,
  buttonText: string,
  withDivider?: boolean
}) {
  return (
    <SlideUp.Div className={`group pt-12 flex flex-col`}>
      <Grid.ColFour className="items-end">
        <div className="col-span-3">
          {children}
        </div>

        <T.Body1 className="group-hover:text-foreground text-foreground/75 transition-colors duration-500 col-span-1">
          {buttonText}
          <span className="w-1 group-hover:w-4 inline-block transition-[width] duration-500" />
          {">>"}
          <span className="w-4 group-hover:w-1 inline-block transition-[width] duration-500" />
        </T.Body1>
      </Grid.ColFour>

      <div className="flex-1" />
      {
        withDivider &&
        <Divider className="group-hover:bg-foreground transition-colors duration-500 mt-12" />
      }
    </SlideUp.Div >
  )
}

function Spacer() {
  return <div className="pb-12 select-none" />
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
