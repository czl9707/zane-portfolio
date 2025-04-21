"use client"

import * as React from 'react'

export default function ThemeCorrector() {
    React.useEffect(() => {
        if (document.body.getAttribute("data-theme") !== 'dark') {
            document.body.setAttribute("data-theme", 'dark')
        }
    }, [])

    return (
        <></>
    )
}