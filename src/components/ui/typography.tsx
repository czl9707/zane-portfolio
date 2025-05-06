import * as React from 'react';
import clsx from "clsx";
import style from './typography.module.css';

function styledTypographyFactory(
    Comp: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',
    variantClassName: string
) {
    return React.forwardRef<HTMLParagraphElement, React.HTMLProps<HTMLParagraphElement> &
    {
        asElement?: AsElement
    }
    >(
        function StyledTypography({ className, asElement, ...others }, ref) {
            const ResolvedComp = asElement ?? Comp;
            return <ResolvedComp ref={ref} {...others}
                className={clsx(style.TypographyBase, variantClassName, className)} />
        }
    )
}

export type AsElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export const H1 = styledTypographyFactory("h1", style.TypographyH1);
export const H2 = styledTypographyFactory("h2", style.TypographyH2);
export const H3 = styledTypographyFactory("h3", style.TypographyH3);
export const H4 = styledTypographyFactory("h4", style.TypographyH4);
export const H5 = styledTypographyFactory("h5", style.TypographyH5);
export const H6 = styledTypographyFactory("h6", style.TypographyH6);
export const Body1 = styledTypographyFactory("p", style.TypographyBody1);
export const Body2 = styledTypographyFactory("p", style.TypographyBody2);
export const Button = styledTypographyFactory("p", style.TypographyButton);
