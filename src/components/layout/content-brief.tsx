import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import ExtendingButton from "@/components/ui/extending-button";

import style from './content-brief.module.css'
import clsx from "clsx";
import React from "react";


export default function ContentBrief({ children, buttonText, noDivider = false }: {
  children?: React.ReactNode,
  buttonText: string,
  noDivider?: boolean
}) {
  return (
    <SlideUp.Div>
      <div className={clsx(ExtendingButton.hoverContext, style.ContentBriefContainer)}>
        <div style={{ flex: "1 1" }}>
          {children}
        </div>
        <ExtendingButton label={buttonText} />
      </div>
      {!noDivider && <Divider />}
    </SlideUp.Div >
  )
}

const BriefsContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function BriefsContainer({ className, ...other }, ref) {
        return (
            <div className={clsx(style.BriefsContainer, className)}
                ref={ref} {...other} />
        )
    }
)

ContentBrief.Container = BriefsContainer;