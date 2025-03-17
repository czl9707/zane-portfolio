import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";
import { styled } from "@pigment-css/react";
import ExtendingButton from "@/components/ui/extending-button";


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
  },
}));



export default function ProjectBlogBrief({ children, buttonText, noDivider = false }: {
  children?: React.ReactNode,
  buttonText: string,
  noDivider?: boolean
}) {
  return (
    <SlideUp.Div>
      <BriefContainer className={ExtendingButton.hoverContext}>
        <div style={{ flex: "1 1" }}>
          {children}
        </div>
        <ExtendingButton label={buttonText} />
      </BriefContainer>
      {!noDivider && <Divider />}
    </SlideUp.Div >
  )
}
