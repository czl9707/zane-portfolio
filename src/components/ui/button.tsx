import * as React from 'react';
import { ColorVariants } from "./tokens.type";

interface ButtonProps {
    variant?: "outline" | "filled",
    color?: ColorVariants,
};

const Button = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & ButtonProps>(
    function Button({ className, children, variant = "filled", color = "default", ...other }, ref) {
        return (<div ref={ref} {...other} className={[
            className,
            resolveTextColorClass(color, variant),
            resolveBackgroundColorClass(color, variant),
            color === "transparent" ? "" : `border border-${color === "default" ? "background" : color} border-solid`,
            'rounded-sm cursor-pointer select-none px-4 py-2 m-0',
            "transition-colors duration-300",
            `hover:`
        ].join(' ')} >
            {children}
        </div>)
    }
)


function resolveTextColorClass(color: ColorVariants, variant: "outline" | "filled") {
    if (color === "default") {
        if (variant === "outline") return "text-textprimary";
        else return "text-background";
    }
    else if (color === "transparent") {
        return "text-textprimary"
    }
    else {
        if (variant === "outline") return color;
        else return `text-${color}-contrast`;
    }
}

function resolveBackgroundColorClass(color: ColorVariants, variant: "outline" | "filled") {
    if (color === "transparent") return "bg-transparent hover:bg-gray-500/25 active:bg-gray-500/50";
    if (color === "default") {
        if (variant === "outline") {
            return 'bg-background hover:bg-background-dim active:bg-background-dimmer'
        }
        return "bg-textprimary hover:bg-textprimary-dim active:bg-textprimary-dimmer";
    }
    else {
        if (variant === "outline") {
            return `bg-background hover:bg-${color}-dimmer active:bg-${color}-dim`
        }
        else {
            return `bg-${color} hover:bg-${color}-dim active:bg-${color}-dimmer`
        }
    }
}

export default Button;