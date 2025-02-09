import * as SlideUp from '@/components/ui/slideup-effect';

export default function SlidingDownIcon({ className }: { className?: string }) {
    return (
        <SlideUp.FullWidth className={className}>
            <svg viewBox="0 0 100 300" width="2rem" height="6rem"
                className="m-auto stroke-foreground/50 stroke-[10]"
                strokeLinecap="square" strokeLinejoin="miter">
                <polyline points="0,100 50,130 100,100" className="animate-[icon-scroll-down_3s_.3s_ease-in-out_infinite_backwards]" />
                <polyline points="0,150 50,180 100,150" className="animate-[icon-scroll-down_3s_ease-in-out_infinite_backwards]" />
            </svg>
        </SlideUp.FullWidth>
    )
}
