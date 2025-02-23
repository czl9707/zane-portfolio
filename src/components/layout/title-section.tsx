import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import Divider from '@/components/ui/divider';
import { solidBackground } from '@/components/ui/util';
import { css } from '@pigment-css/react';

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
