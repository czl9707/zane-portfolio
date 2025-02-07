"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

export default function ScollToTopOnNavigate() {
    const pathname = usePathname()
    React.useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])

    return <></>
}