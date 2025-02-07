import * as Container from '@/components/ui/container';
import * as SlideUp from '@/components/ui/slideup-effect';
import { twMerge } from "@/lib/utils/tw-merge";
import Divider from '@/components/ui/divider';

export default function TitleSection({ children, className, noDivider = false }: {
    children?: React.ReactNode,
    className?: string,
    noDivider?: boolean,
}) {
    return (
        <Container.FullWidth className={
            twMerge("bg-background", className)
        }>
            {
                !noDivider && <Divider />
            }
            <SlideUp.Div className='pb-paragraph mt-64'>
                {children}
            </SlideUp.Div>
        </Container.FullWidth>
    )
}
