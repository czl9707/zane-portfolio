import * as Container from "@/components/ui/container";

import * as React from 'react'
import clsx from "clsx";

import style from './page-layout.module.css';

const ContentLayout = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ContentLayout({ className, ...other }, ref) {
        return (
            <Container.FullWidth className={clsx(style.ContentLayout, className)}
                ref={ref} {...other} />
        )
    }
)
const ContentContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function ContentContainer({ className, ...other }, ref) {
        return (
            <div className={clsx(style.ContentContainer, className)}
                ref={ref} {...other} />
        )
    }
)
const CatagoryContainer = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function CatagoryContainer({ className, ...other }, ref) {
        return (
            <div className={clsx(style.CatagoryContainer, className)}
                ref={ref} {...other} />
        )
    }
)

export {
    ContentLayout as Layout,
    ContentContainer as Content,
    CatagoryContainer as Catagory,
}