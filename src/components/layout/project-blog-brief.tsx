import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import { styled } from "@pigment-css/react";

const ExtendingButtonMark = styled("span")(({ theme }) => ({
  width: "3rem", display: "inline-block", textAlign: "left",
  content: ">>", transform: "translateX(.5rem)",
  transition: `transform ${theme.transition.short}`,
}));

const ExtendingButton = styled(T.Body1)(({ theme }) => ({
  color: `rgb(${theme.vars.color.default.foreground} / 0.75)`,
  transition: `color ${theme.transition.short}`,
  textAlign: "right", minWidth: "33%",
}));

const BriefContainer = styled("div")(({ theme }) => ({
  display: "flex", alignItems: "flex-end",
  gap: theme.spacing.component,

  flexDirection: "column",
  [`@media(min-width: ${theme.breakpoint.md})`]: { flexDirection: "row", },

  [`& + ${Divider}`]: {
    marginTop: theme.spacing.group,
    transition: `border-top-color ${theme.transition.short}`,
  },

  "&:hover": {
    [`+ ${Divider}`]: { borderTopColor: `rgb(${theme.vars.color.default.foreground})` },
    [`${ExtendingButton}`]: { color: `rgb(${theme.vars.color.default.foreground})`, },
    [`${ExtendingButtonMark}`]: { transform: "translateX(1.5rem)" }
  },
}));



export default function ProjectBlogBrief({ children, buttonText, noDivider = false }: {
  children?: React.ReactNode,
  buttonText: string,
  noDivider?: boolean
}) {
  return (
    <SlideUp.Div>
      <BriefContainer>
        <div style={{ flex: "1 1" }}>
          {children}
        </div>
        <ExtendingButton>
          {buttonText}
          <ExtendingButtonMark>{">>"}</ExtendingButtonMark>
        </ExtendingButton>
      </BriefContainer>
      {!noDivider && <Divider />}
    </SlideUp.Div >
  )
}
