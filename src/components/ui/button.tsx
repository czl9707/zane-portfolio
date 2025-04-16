import * as React from 'react';

import { ColorVariation } from "@pigment-css/react/theme"
import clsx from 'clsx';

import buttonStyle from './button.module.css';

type ButtonColorVariation = ColorVariation | "transparent"

interface ButtonProps {
    variant?: "outline" | "filled",
    color?: ButtonColorVariation,
};


const ButtonBase = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ButtonBase({ className, children, ...other }, ref) {
        return (
            <div className={clsx(className, buttonStyle.ButtonContainer)}
                ref={ref} {...other}>
                <div className={buttonStyle.ButtonMask} />
                {children}
            </div>
        )
    }
)

const FilledButton = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { color?: ButtonColorVariation }>(
    function FilledButton({ className, style, color, ...others }, ref) {
        const textColor = color === "transparent" ? `var(--color-${color}-foreground)` : `var(--color-${color}-background)`;
        const backgroundColor = color === "transparent" ? "transparent" : `var(--color-${color}-foreground)`;
        const maskColor = `var(--color-default-${color === "transparent" ? "foreground" : "background"})`;

        return (
            <ButtonBase className={clsx(className, buttonStyle.FilledButtonContainer)}
                style={{
                    ...style,
                    "--button-text-color": textColor,
                    "--button-background-color": backgroundColor,
                    "--button-mask-color": maskColor,
                } as React.CSSProperties}
                {...others} ref={ref} />
        )
    }
);

const OutlineButton = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { color?: ButtonColorVariation }>(
    function OutlineButton({ className, style, color, ...others }, ref) {
        const textColor = `var(--color-${color === 'transparent' ? 'default' : color}-foreground)`;
        const backgroundColor = color === "transparent" ? "transparent" : `var(--color-${color}-background)`;
        const maskColor = `var(--color-default-foreground)`;

        return (
            <ButtonBase className={clsx(className, buttonStyle.OutlineButtonContainer)}
                style={{
                    ...style,
                    "--button-text-color": textColor,
                    "--button-background-color": backgroundColor,
                    "--button-mask-color": maskColor,
                } as React.CSSProperties}
                {...others} ref={ref} />
        )
    }
);

export const Button = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & ButtonProps>(
    function Button({ variant = "outlined", color = 'default', ...other }, ref) {
        return variant === "filled" ?
            <FilledButton color={color} {...other} ref={ref} /> :
            <OutlineButton color={color} {...other} ref={ref} />;
    }
)

export default Button;