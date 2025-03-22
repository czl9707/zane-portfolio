import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import * as T from '@/components/ui/typography';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import { css } from '@pigment-css/react';
import * as React from 'react';

const titleContainer = css(({ theme }) => ({
    paddingBottom: theme.spacing.paragraph, paddingTop: theme.spacing.block,
}));

const linkTagged = css(({ theme }) => ({
    "&::before": {
        content: "\"#\"", position: "absolute",
        transform: "translateX(-145%)",
        transition: `opacity ${theme.transition.short}`,
        opacity: 0,
    },
    "&:hover::before": {
        opacity: 0.3,
    }
}));

export default function TitleSection({ children, className, noDivider = false, style = {} }: {
    children?: React.ReactNode,
    className?: string,
    noDivider?: boolean,
    style?: React.CSSProperties,
}) {
    return (
        <Container.FullWidth className={[solidBackground, className].join(" ")} style={style}>
            {
                !noDivider && <Divider />
            }
            <SlideUp.Div className={titleContainer}>
                {children}
            </SlideUp.Div>
        </Container.FullWidth>
    )
}

TitleSection.Heading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function RespondingSectionTitle({ className, ...others }, ref) {
        return <>
            <T.H2 {...others} ref={ref} className={[
                css(({ theme }) => ({
                    [`@media(max-width: ${theme.breakpoint.xs})`]: { display: "none" },
                })),
                linkTagged,
                className,
            ].join(" ")} />
            <T.H4 {...others} ref={ref} className={[
                css(({ theme }) => ({
                    [`@media(min-width: ${theme.breakpoint.xs})`]: { display: "none" },
                })),
                linkTagged,
                className,
            ].join(" ")} />
        </>
    }
);