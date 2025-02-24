import * as React from 'react';

import { ColorVariation, ExtendTheme, ThemeToken } from "@pigment-css/react/theme"
import { styled } from '@pigment-css/react';

type ButtonColorVariants = Exclude<ColorVariation, "shade">;

interface ButtonProps {
    variant?: "outline" | "filled",
    color?: ButtonColorVariants,
};

const ButtonActiveMask = styled("span")(({ theme }) => ({
    display: "block", position: "absolute", inset: 0, pointerEvents: "none",
    backgroundColor: "transparent",
    transition: `backgroundColor ${theme.transition.short}`,
}));

const ButtonBase = styled("div")<ButtonProps>(({ theme }) => ({
    color: ({ variant = "filled", color = "default" }) => `rgb(${resolveTextColor(color, variant, theme)})`,
    backgroundColor: ({ variant = "filled", color = "default" }) => `rgb(${resolveBackgroundColor(color, variant, theme)})`,
    border: ({ variant = "filled", color = "default" }) => variant === "filled" ?
        `1px solid rgb(${resolveBackgroundColor(color, variant, theme)})` : `1px solid rgb(${resolveTextColor(color, variant, theme)})`,
    borderRadius: theme.size.border.radius,

    display: "relative", cursor: "pointer", userSelect: "none", overflow: "hidden",
    paddingLeft: "1rem", paddingRight: "1rem", paddingTop: ".5rem", paddingBottom: ".5rem", margin: "0",

    fontFamily: theme.typographies.button.fontFamily,
    fontSize: theme.typographies.button.fontSize,
    fontWeight: theme.typographies.button.fontWeight,
    lineHeight: theme.typographies.button.lineHeight,

    "&:hover": {
        [`${ButtonActiveMask}`]: {
            backgroundColor: ({ variant = "filled", color = "default" }) => (variant === "filled" && color !== "default") ?
                `rgb(${theme.vars.color.shade.background} / 0.4)` : `rgb(${theme.vars.color.shade.foreground} / 0.2)`
        },
    },
    "&:active": {
        [`${ButtonActiveMask}`]: {
            backgroundColor: ({ variant = "filled", color = "default" }) => (variant === "filled" && color !== "default") ?
                `rgb(${theme.vars.color.shade.background} / 0.6)` : `rgb(${theme.vars.color.shade.foreground} / 0.4)`
        },
    },
}))


const Button = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & ButtonProps>(
    function Button({ children, variant = "filled", color = "default", ...other }, ref) {
        return (<ButtonBase {...other} variant={variant} color={color} ref={ref}>
            <ButtonActiveMask />
            {children}
        </ButtonBase>)
    }
)


function resolveTextColor(
    color: ButtonColorVariants,
    variant: "outline" | "filled",
    theme: ExtendTheme<{
        colorScheme: "light" | "dark";
        tokens: ThemeToken;
    }>,
): string {
    if (color === "default") {
        return theme.vars.color.default.foreground;
    }
    else {
        if (variant === "outline") return theme.vars.color[color].background;
        else return theme.vars.color[color].foreground;
    }
}

function resolveBackgroundColor(
    color: ButtonColorVariants,
    variant: "outline" | "filled",
    theme: ExtendTheme<{
        colorScheme: "light" | "dark";
        tokens: ThemeToken;
    }>,
) {
    if (color === "default" || variant === "outline") {
        return "transparent";
    }
    else {
        return theme.vars.color[color].background;
    }
}

export default Button;