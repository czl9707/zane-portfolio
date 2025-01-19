/* eslint-disable @next/next/no-img-element */
import * as Container from "@/components/ui/container";
import * as Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import StyledMarkdown from "@/components/ui/styled-markdown";

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
      <div className="h-screen flex flex-col pt-24 pb-12 sticky top-0">
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
    <PinnedSection>
      <Grid.ColThree>
        <T.H3 className="col-span-1" id="who_am_i">Who am I?</T.H3>

        <T.Body1 className="col-span-2">
          Once an
          <Link href="#as_a_architect"> <u>architect</u></Link>, now a self-taught
          <Link href="#as_a_developer"> <u>software engineer</u></Link>, I enjoy building solutions. Currently I am working at
          <Link href="https://www.bloomberg.com/professional"> <u>Bloomberg</u> </Link> as a software engineer, while I keep building
          side projects outside of work to keep myself sharp. Before transitioning into tech, I received 7-year architect training,
          worked on projects spanning from individual housing designs to large-scale urban planning.
          Living at the crossroads of diverse cultures and domains, I embrace the richness of multiple perspectives.
        </T.Body1>
      </Grid.ColThree>
    </PinnedSection>
  )
}

function DeveloperSection({ projects, blogs = [] }: { projects: ZaneDevProject.Info[], blogs: ZaneDevBlog.Info[] }) {
  return (
    <>
      <PinnedSection>
        <Grid.ColThree id="as_a_developer">
          <T.H3 className="col-span-1">As a Software Engineer</T.H3>

          <T.Body1 className="col-span-2">
            I thrive on building seamless solutions, bridging gaps in technologies with innovative ideas.
            My side projects and blogs serve as platforms to explore new tools, document what I learn, and share solutions to challenges.
          </T.Body1>
        </Grid.ColThree>
      </PinnedSection>

      <PinnedSection>
        <T.H3>Featured Projects</T.H3>
        <Spacer />

        <Grid.ColThree>
          {
            projects.map(project => (
              <ProjectCard href={`/as/developer/project/${project.title.replace(" ", "_")}`}
                project={project} key={project.title} />
            ))
          }
        </Grid.ColThree>
      </PinnedSection>

      <PinnedSection>
        <T.H3>Featured Blogs</T.H3>
        <Spacer />
        {
          blogs.map(blog => (
            <BlogSession href={`/as/developer/blog/${blog.title.replace(" ", "_")}`}
              blog={blog} key={blog.title} />
          ))
        }

      </PinnedSection>

    </>
  )
}


async function ArchitectSection({ projects }: { projects: ZaneArchProject.Info[] }) {
  return (
    <>
      <PinnedSection>
        <Grid.ColThree id="as_a_architect">
          <T.H3 className="col-span-1">As an Architect</T.H3>

          <T.Body1 className="col-span-2">
            Being an architect turned developer is a rewarding journey—architecture nurtured my systematic and aesthetic thinking,
            while coding empowers me to bring those ideas to life and make a broader impact efficiently.
          </T.Body1>
        </Grid.ColThree>
        <Spacer />
      </PinnedSection>

      <PinnedSection>
        <T.H3>Featured Archived Projects</T.H3>
        <Spacer />
        <Grid.ColThree>
          {
            projects.map(project => (
              <ProjectCard href={`/as/architect/project/${project.title.replace(" ", "_")}`}
                project={project} key={project.title} />
            ))
          }
        </Grid.ColThree>
      </PinnedSection>
    </>
  )
}

function ProjectCard({ project, href }: { project: ZaneArchProject.Info | ZaneDevProject.Info, href: string }) {
  return (
    <Link href={href}>
      <SlideUp.Div className="group aspect-[4/3] overflow-hidden rounded relative">
        <img src={project.cover.url} alt={project.cover.alt}
          className="aspect-[4/3] absolute inset-0 object-cover group-hover:scale-110 duration-500" />

        <div className={twJoin(
          "absolute inset-0 object-cover opacity-0 bg-background/75 text-foreground p-8",
          "flex flex-col",
          "group-hover:opacity-100 duration-500"
        )} >
          <div className="flex flex-row items-end">
            <T.H5>{project.title}</T.H5>
            <div className="flex-1" />
            <T.Body2 className="text-foreground/75">
              {
                project.startDate.getFullYear()}.{project.startDate.getMonth() + 1
              } - {project.endDate ?
                `${project.endDate.getFullYear()}.${project.endDate.getMonth() + 1}` :
                "Ongoing"
              }
            </T.Body2>
          </div>
          <T.Body1 className="text-foreground/75">{project.subTitle}</T.Body1>

          <div className="pt-4 flex-0 align-bottom overflow-y-clip overscroll-contain">
            <StyledMarkdown>
              {project.description.toString()}
            </StyledMarkdown>
          </div>
        </div>
      </SlideUp.Div>
    </Link>
  )
}

function BlogSession({ blog, href }: { blog: ZaneDevBlog.Info, href: string }) {
  return (
    <SlideUp.FullWidth className="group">
      <Link href={href}>
        <div className="w-full flex flex-row py-4 gap-4">
          <img src={blog.cover.url} alt={blog.cover.alt}
            className={"aspect-video object-cover lg:block hidden w-1/5"} />

          <div className="p-4 rounded flex-1 overflow-hidden group-hover:bg-foreground/10 transition-colors duration-500">
            <T.H5 className="mb-2">{blog.title}</T.H5>
            <div>
              <StyledMarkdown>
                {blog.description.toString()}
              </StyledMarkdown>
            </div>
          </div>
        </div>
      </Link>
      <Divider />
    </SlideUp.FullWidth >
  )
}


function PinnedSection({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <SlideUp.FullWidth className={
      twMerge("sticky top-24 bg-background z-10", className)
    }>
      <Divider />
      <div className="py-12">
        {children}
      </div>
    </SlideUp.FullWidth>
  )
}


function Spacer() {
  return <div className="pb-12" />
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