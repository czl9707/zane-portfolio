import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import * as T from '@/components/ui/typography';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import { css } from '@pigment-css/react';
import React from 'react';

const titleContainer = css(({ theme }) => ({
    paddingBottom: theme.spacing.paragraph, paddingTop: "16rem"
}))

export default function TitleSection({ children, className, noDivider = false }: {
    children?: React.ReactNode,
    className?: string,
    noDivider?: boolean,
}) {
    return (
        <Container.FullWidth className={[solidBackground, className].join(" ")}>
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
                className
            ].join(" ")} />
            <T.H3 {...others} ref={ref} className={[
                css(({ theme }) => ({
                    [`@media(min-width: ${theme.breakpoint.xs})`]: { display: "none" },
                })),
                className
            ].join(" ")} />
        </>
    }
);