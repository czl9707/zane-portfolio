import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import { twMerge } from 'tailwind-merge';
import Divider from '@/components/ui/divider';

export default function TitleSection({ children, className }: {
    children?: React.ReactNode,
    className?: string
}) {
    return (
        <Container.FullWidth className={
            twMerge("bg-background", className)
        }>
            <Divider />

            <span className="h-64 block select-none" />
            <SlideUp.Div className='pb-paragraph'>
                {children}
            </SlideUp.Div>
        </Container.FullWidth>
    )
}
