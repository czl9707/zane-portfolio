import * as T from "@/components/ui/typography";
import { styled, css } from "@pigment-css/react";

const ExtendingButtonMark = styled("span")(({ theme }) => ({
    width: "3rem", display: "inline-block", textAlign: "left",
    content: ">>", transform: "translateX(.5rem)",
    transition: `transform ${theme.transition.short}`,
}));

const ExtendingButtonTypography = styled(T.Body1)(({ theme }) => ({
    color: `rgb(${theme.vars.color.default.foreground} / 0.75)`,
    transition: `color ${theme.transition.short}`,
    textAlign: "right",
}));

const buttonHoverContext = css(({ theme }) => ({
    "&:hover": {
        [`${ExtendingButtonTypography}`]: { color: `rgb(${theme.vars.color.default.foreground})`, },
        [`${ExtendingButtonMark}`]: { transform: "translateX(1.5rem)" }
    },
}));


export default function ExtendingButton({ label }: { label: string }) {
    return (
        <ExtendingButtonTypography className={buttonHoverContext}>
            {label}
            <ExtendingButtonMark>{">>"}</ExtendingButtonMark>
        </ExtendingButtonTypography>
    )
}

ExtendingButton.hoverContext = buttonHoverContext;