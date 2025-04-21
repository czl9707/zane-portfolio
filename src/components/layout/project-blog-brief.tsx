import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import ExtendingButton from "@/components/ui/extending-button";

import style from './project-blog-brief.module.css'
import clsx from "clsx";


export default function ProjectBlogBrief({ children, buttonText, noDivider = false }: {
  children?: React.ReactNode,
  buttonText: string,
  noDivider?: boolean
}) {
  return (
    <SlideUp.Div>
      <div className={clsx(ExtendingButton.hoverContext, style.BriefContainer)}>
        <div style={{ flex: "1 1" }}>
          {children}
        </div>
        <ExtendingButton label={buttonText} />
      </div>
      {!noDivider && <Divider />}
    </SlideUp.Div >
  )
}
