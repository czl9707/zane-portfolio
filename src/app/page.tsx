import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import Spacer from "@/components/ui/spacer";
import ArchitectureProjectCard from "@/components/arch-project/card";
import ContentCard from "@/components/layout/content-card"
import { Outlined as OutlinedCard } from "@/components/layout/card"
import TitleSection from "@/components/layout/title-section";
import ContentSection from "@/components/layout/content-section";
import Button from "@/components/ui/button";
import * as Markdown from "@/components/ui/markdown";
import SlidingDownIcon from "@/components/ui/sliding-down-icon";


import * as Homepage from "@/lib/cms/zane-homepage"
import * as ZaneBlog from "@/lib/cms/zane-blog";
import * as ZaneArchProject from "@/lib/cms/zane-arch-project";
import * as ZaneDevProject from "@/lib/cms/zane-dev-project";

import Link from "next/link";
import React from "react";
import ExtendingButton from "@/components/ui/extending-button";
import StickyHero from "@/components/layout/sticky-hero";

import style from './page.module.css';
import { themeVars } from "@/lib/theme";
import clsx from "clsx";

export const revalidate = 14400;


export default async function Page() {
  const content = await Homepage.getContents();

  return (
    <>
      <IntroSection />
      <WhoAmISection content={content.whoAmI} />
      <WritingsSection blogs={content.featuredBlogs} />
      <DeveloperSection projects={content.featuredDevProjects} />
      <ArchitectSection projects={content.featuredArchProjects} />

      <Container.FullWidth style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
        <FullWidthName />
      </Container.FullWidth>
    </>
  );
}


function IntroSection() {
  return (
    <StickyHero asChild style={{ display: "flex", flexDirection: "column" }}>
      <Container.FullWidth>
        <Grid columns={3}>
          <SlideUp.Div style={{ gridColumn: "span 2 / span 2" }}>
            <T.H4 asElement="h2">
              Precision in detail, vision in design, <br />
              building things one block at a time.
            </T.H4>
          </SlideUp.Div>
        </Grid>

        <Spacer style={{ flex: "1 1" }} />
        <SlidingDownIcon />
        <Spacer />
        <T.H1>
          <FullWidthName style={{ bottom: 0, top: "auto" }} />
        </T.H1>
      </Container.FullWidth>
    </StickyHero>
  )
}

const FullWidthName = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function FullWidthName(props, ref) {
    return (
      <SlideUp.Div {...props} ref={ref}
        style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
        <svg width={"100%"} viewBox="0 0 45 8">
          <title id="ZANE_CHEN">ZANE CHEN</title>
          <text className={style.SVGText} x="50%" y="50%"
            textLength={45} lengthAdjust="spacingAndGlyphs"
            fontWeight={700} fontSize="7.2px"
            dominantBaseline="middle" textAnchor="middle"
          >
            ZANE CHEN
          </text>
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


function WritingsSection({ blogs = [] }: { blogs: ZaneBlog.Info[] }) {
  return (
    <>
      <TitleSection>
        <TitleSection.Heading id="writings">WRITINGS</TitleSection.Heading>
      </TitleSection>

      <Container.FullWidth style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
        <Divider />
        <ContentCard.Container>
          {
            blogs.map((blog) => (
              <ContentCard href={`/blog/by/${blog.role}/${blog.id}`} key={blog.id} rows={2}
                date={blog.createdDate} title={blog.title}
                description={blog.description} tags={blog.tags} />
            ))
          }
          <NavigationCard href={"/blog"} label="Posts Collection"/>
          <NavigationCard href={"/writing"} label="Knowledge Constellations"/>
        </ContentCard.Container>
      </Container.FullWidth>
    </>
  )
}


function DeveloperSection({ projects }: { projects: ZaneDevProject.Info[] }) {
  return (
    <>
      <TitleSection>
        <TitleSection.Heading id="as_a_developer">NOW A SOFTWARE ENGINEER</TitleSection.Heading>
      </TitleSection>

      <Container.FullWidth style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
        <Divider />
        <ContentCard.Container>
          {
            projects.map((project) => (
              <ContentCard href={project.externalLink} target="_blank" key={project.title} rows={2}
                date={project.startDate} title={project.title}
                description={project.description} tags={project.tags} />
            ))
          }
          {projects.length % 2 === 1 && <span/>}
          <NavigationCard href={"/project/by/developer"} label="All Projects"/>
        </ContentCard.Container>
      </Container.FullWidth>
    </>
  )
}

function NavigationCard({ label, href }: { label: string, href: string }) {
  return (
    <OutlinedCard href={href} className={clsx(ExtendingButton.hoverContext, style.NavigationCard)}>
      <ExtendingButton label={label} />
    </OutlinedCard>
  )
}


async function ArchitectSection({ projects }: { projects: ZaneArchProject.Info[] }) {
  return (
    <>
      <TitleSection>
        <div className={style.ResponsiveTitle}>
          <TitleSection.Heading id="as_an_architect" >ONCE AN ARCHITECT</TitleSection.Heading>
        </div>
      </TitleSection >

      <Container.FullWidth
        style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
        <Divider />
        <ArchitectureProjectCard.Container>
          {
            projects.map(project => (
              <ArchitectureProjectCard project={project} key={project.title} />
            ))
          }
        </ArchitectureProjectCard.Container>
      </Container.FullWidth>

      <Container.FullWidth style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        backgroundColor: `rgb(${themeVars.color.default.background})`
      }}>
        <Spacer />
        <SlideUp.Div >
          <Link href="/project/by/architect">
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
