import * as T from "@/components/ui/typography";
import * as SlideUp from "@/components/ui/slideup-effect";
import Divider from "@/components/ui/divider";



export default function ProjectBlogBriefSession({ children, buttonText, noDivider = false }: {
  children?: React.ReactNode,
  buttonText: string,
  noDivider?: boolean
}) {
  return (
    <SlideUp.Div className={`group pt-component flex flex-col`}>
      <div className="flex flex-row gap-component items-end">
        <div className="flex-1">
          {children}
        </div>
        <T.Body1 className="group-hover:text-foreground text-foreground/75 transition-colors duration-500 col-span-1 min-w-[25%] text-right">
          {buttonText}
          <span className="w-2 group-hover:w-6 inline-block transition-[width] duration-500" />
          {">>"}
          <span className="w-6 group-hover:w-2 inline-block transition-[width] duration-500" />
        </T.Body1>
      </div>

      {
        !noDivider &&
        <Divider className="group-hover:bg-foreground transition-colors duration-500 mt-group" />
      }
    </SlideUp.Div >
  )
}