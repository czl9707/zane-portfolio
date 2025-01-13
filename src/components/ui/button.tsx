import * as React from 'react';
import { ColorVariants } from "./tokens.type";
import { twJoin, twMerge } from 'tailwind-merge';

interface ButtonProps {
    variant?: "outline" | "filled",
    color?: ColorVariants,
};

const Button = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & ButtonProps>(
    function Button({ className, children, variant = "filled", color = "default", ...other }, ref) {
        return (<div ref={ref} {...other} className={twMerge(
            twJoin(
                resolveTextColorClass(color, variant),
                resolveBackgroundColorClass(color, variant),
                (color === "default" && variant === "filled") ?
                    "" : `border border-${color === "default" ? "foreground" : color} border-solid`,
                'relative rounded cursor-pointer select-none px-4 py-2 m-0 text-opacity-0 text-red overflow-hidden',
                "group",
            ),
            className,
        )} >
            <div className={twMerge(
                "absolute inset-0 bg-transparent pointer-events-none",
                "transition-colors duration-300",
                variant === "filled" && color !== "default" ? "group-hover:bg-shade-fade/40 group-active:bg-shade-fade/60" :
                    "group-hover:bg-shade-contrast/20 group-active:bg-shade-contrast/40"
            )} />
            {children}
        </div>)
    }
)


function resolveTextColorClass(color: ColorVariants, variant: "outline" | "filled") {
    if (color === "default") {
        return "text-foreground";
    }
    else {
        if (variant === "outline") return color;
        else return `text-${color}-foreground`;
    }
}

function resolveBackgroundColorClass(color: ColorVariants, variant: "outline" | "filled") {
    if (color === "default" || variant === "outline") {
        return 'bg-transparent';
    }
    else {
        return `bg-${color}`
    }
}

export default Button;