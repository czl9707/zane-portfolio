"use client"

import { css } from '@pigment-css/react';
import * as React from 'react'

const DarkModeClass = css({
    colorScheme: "dark"
})

export default function ThemeCorrector() {
    React.useEffect(() => {
        if (document.documentElement.getAttribute("data-theme") !== 'dark') {
            document.documentElement.setAttribute("data-theme", 'dark')
            document.body.classList.add(DarkModeClass);
        }
    }, [])

    return (
        <></>
    )
}