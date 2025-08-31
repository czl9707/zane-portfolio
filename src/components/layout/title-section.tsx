import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import * as T from '@/components/ui/typography';
import Divider from '@/components/ui/divider';
import { themeVars } from '@/lib/theme';

import * as React from 'react';
import style from './title-section.module.css'
import clsx from 'clsx';

export default function TitleSection({ children, className, noDivider = false }: {
    children?: React.ReactNode,
    className?: string,
    noDivider?: boolean,
}) {
    return (
        <Container.FullWidth className={className}
            style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
            {
                !noDivider && <Divider />
            }
            <SlideUp.Div className={style.TitleContainer}>
                {children}
            </SlideUp.Div>
        </Container.FullWidth>
    )
}

TitleSection.Heading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { asElement?: T.AsElement }>(
    function RespondingSectionTitle({ className, ...others }, ref) {
        return <>
            <T.H2 {...others} ref={ref} className={clsx(
                style.ShowOnSM,
                style.LinkWithTag,
                className,
            )} />
            <T.H4 {...others} ref={ref} className={clsx(
                style.NoShowOnSM,
                style.LinkWithTag,
                className,
            )} />
        </>
    }
);
