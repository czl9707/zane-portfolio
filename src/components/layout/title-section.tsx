import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import * as T from '@/components/ui/typography';
import Divider from '@/components/ui/divider';
import HeadingWithTag from '@/components/ui/heading-with-tag';
import { themeVars } from '@/lib/theme';

import * as React from 'react';
import style from './title-section.module.css'
import clsx from 'clsx';

export default function TitleSection({ children, className, omitDivider = false }: {
    children?: React.ReactNode,
    className?: string,
    omitDivider?: boolean,
}) {
    return (
        <Container.FullWidth className={className}
            style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
            {
                !omitDivider && <Divider />
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
            <HeadingWithTag>
                <T.H2 {...others} ref={ref} className={clsx(
                    style.ShowOnSM,
                    className,
                )} />
            </HeadingWithTag>
            <HeadingWithTag>
                <T.H4 {...others} ref={ref} className={clsx(
                    style.NoShowOnSM,
                    className,
                )} />
            </HeadingWithTag>
        </>
    }
);
