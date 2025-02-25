import * as SlideUp from '@/components/ui/slideup-effect';
import { keyframes, styled } from '@pigment-css/react';

const SlidingDownIconSVG = styled("svg")(({ theme }) => ({
    margin: "auto", display: "block",
    stroke: `rgb(${theme.vars.color.default.foreground} / 50)`, strokeWidth: "10",
}))

const SlidingDown = keyframes({
    "0%": { opacity: 0, transform: "translateY(-30%)" },
    "50%": { opacity: 1, transform: "none" },
    "100%": { opacity: 0, transform: "translateY(30%)" },
})

export default function SlidingDownIcon() {
    return (
        <SlideUp.FullWidth>
            <SlidingDownIconSVG viewBox="0 0 100 300" width="2rem" height="6rem"
                strokeLinecap="square" strokeLinejoin="miter">
                <polyline points="0,100 50,130 100,100" style={{ animation: `${SlidingDown} 3s ease-in-out .3s infinite backwards` }} />
                <polyline points="0,150 50,180 100,150" style={{ animation: `${SlidingDown} 3s ease-in-out infinite backwards` }} />
            </SlidingDownIconSVG>
        </SlideUp.FullWidth>
    )
}
