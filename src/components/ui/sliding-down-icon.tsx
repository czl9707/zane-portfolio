import * as SlideUp from '@/components/ui/slideup-effect';

import style from './sliding-down-icon.module.css'

export default function SlidingDownIcon() {
    return (
        <SlideUp.FullWidth>
            <svg className={style.SlidingDownIcon} viewBox="0 0 100 300" width="2rem" height="6rem"
                strokeLinecap="square" strokeLinejoin="miter">
                <polyline points="0,100 50,130 100,100" className={style.SlidingDownIconPolyline} style={{ animationDelay: ".3s" }} />
                <polyline points="0,150 50,180 100,150" className={style.SlidingDownIconPolyline} />
            </svg>
        </SlideUp.FullWidth>
    )
}
