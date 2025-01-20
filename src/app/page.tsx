/* eslint-disable @next/next/no-img-element */
import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import StyledMarkdown from "@/components/ui/styled-markdown";
import ArchitectureProjectCard from "@/components/arch-project-card";
import BlogCard from "@/components/blog-card";
import DevProjectCard from "@/components/dev-project-card";
import { HEIGHT_CLASS as BlogCardHeight } from "@/components/blog-card";
import { HEIGHT_CLASS as DevProjectCardHeight } from "@/components/dev-project-card";

import * as Homepage from "@/lib/cms/zane-homepage"
import * as ZaneDevBlog from "@/lib/cms/zane-dev-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import "./page.css"
import Link from "next/link";
import { twJoin, twMerge } from "tailwind-merge";
import React from "react";

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
      {/* <Container.Default className="h-36" />
      <SlidingIcon />
      <Container.Default className="h-24" /> */}
      <DeveloperSection projects={content.featuredDevProjects} blogs={content.featuredBlogs} />

      <ArchitectSection projects={content.featuredArchProjects} />
    </>
  );
}

function IntroSection() {
  return (
    <>
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

      {/* <div className="h-screen" /> */}
    </>
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
        <div className="col-span-3">
          {
            projects.map(project => (
              <DevProjectCard
                project={project} key={project.title} />
            ))
          }
        </div>

        <div className={`${DevProjectCardHeight}`}></div>
      </ContentSection>

      <ContentSection className="group/section"
        header={
          <T.H5 className="text-foreground/75">Featured Blogs</T.H5>
        }
      >
        <div className="col-span-3">
          {
            blogs.map(blog => (
              <BlogCard
                blog={blog} key={blog.title} />
            ))
          }
        </div>

        <div className={`${BlogCardHeight}`}></div>
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
      <SlideUp.Div className={"pb-8 pt-96"}>
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


function Spacer() {
  return <div className="pb-12 select-none" />
}

function SlidingIcon() {
  return (
    <Container.FullWidth>
      <svg viewBox="0 0 100 300" width="2rem" height="6rem"
        className="m-auto stroke-foreground/50 stroke-[10]"
        strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="0,100 50,130 100,100" className="animate-[icon-scroll-down_3s_.3s_ease-in-out_infinite_backwards]" />
        <polyline points="0,150 50,180 100,150" className="animate-[icon-scroll-down_3s_ease-in-out_infinite_backwards]" />
      </svg>
    </Container.FullWidth>
  )
}