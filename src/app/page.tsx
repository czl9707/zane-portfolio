import Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import "./page.css"

function SlidingIcon() {
  return (
    <Container>
      <svg viewBox="0 0 100 300" width="2rem" height="6rem"
        className="m-auto stroke-foreground/50 stroke-[10]"
        strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="0,100 50,130 100,100" className="animate-[scroll-down_3s_.3s_ease-in-out_infinite_backwards]" />
        <polyline points="0,150 50,180 100,150" className="animate-[scroll-down_3s_ease-in-out_infinite_backwards]" />
      </svg>
    </Container>
  )
}

export default function Page() {
  return (
    <>
      <Container className="h-64" />
      <Container>
        <T.H3>Hi, I am Zane!</T.H3>
        <br />
        <T.H3>
          Precision in detail, vision in design, building things one block at a time.
        </T.H3>
      </Container>

      <Container className="h-16" />

      <Container>
        <T.Body1>
          Once an
          <Link href="#as_a_architect"> <u>architect</u></Link>, now a self-taught
          <Link href="#as_a_developer"> <u>software engineer</u></Link>, I enjoy building solutions. Currently I am working at
          <Link href="https://www.bloomberg.com/professional"> <u>Bloomberg</u> </Link> as a software engineer, while I keep building
          side projects outside of work to keep myself sharp. Before transitioning into tech, I received 7-year architect training,
          worked on projects spanning from individual housing designs to large-scale urban planning.
          Living at the crossroads of diverse cultures and domains, I embrace the richness of multiple perspectives.
        </T.Body1>
      </Container>

      <Container className="h-36" />
      <SlidingIcon />
      <Container className="h-24" />

      <Container>
        <div className="sticky pt-32 pb-4 bg-background top-0">
          <T.H4 id="as_a_developer">As a Software Engineer</T.H4>
        </div>
        <T.Body1>

        </T.Body1>
      </Container>

      <Container>
        <div className="sticky pt-32 bg-background top-0">
          <T.H4 id="as_a_architect">As a Architect</T.H4>
        </div>

      </Container>
    </>
  );
}
