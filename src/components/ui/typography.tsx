import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
    function H1({ className, ...others }, ref) {
        return <h1 className={twMerge('font-sans text-8xl/tight font-medium', className)} {...others} ref={ref} />
    }
)
const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
    function H2({ className, ...others }, ref) {
        return <h2 className={twMerge('font-sans text-6xl/tight font-medium', className)} {...others} ref={ref} />
    }
)
const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
    function H3({ className, ...others }, ref) {
        return <h3 className={twMerge('font-sans text-5xl/tight font-medium', className)} {...others} ref={ref} />
    }
)
const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
    function H4({ className, ...others }, ref) {
        return <h4 className={twMerge('font-sans text-4xl/tight font-medium', className)} {...others} ref={ref} />
    }
)
const H5 = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
    function H5({ className, ...others }, ref) {
        return <h5 className={twMerge('font-sans text-2xl/snug font-medium', className)} {...others} ref={ref} />
    }
)
const H6 = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
    function H6({ className, ...others }, ref) {
        return <h6 className={twMerge('font-sans text-xl/relaxed font-medium', className)} {...others} ref={ref} />
    }
)
const Body1 = React.forwardRef<HTMLParagraphElement, React.HTMLProps<HTMLParagraphElement>>(
    function Body1({ className, ...others }, ref) {
        return <p className={twMerge('font-sans text-base/normal font-medium', className)} {...others} ref={ref} />
    }
)
const Body2 = React.forwardRef<HTMLParagraphElement, React.HTMLProps<HTMLParagraphElement>>(
    function Body2({ className, ...others }, ref) {
        return <p className={twMerge('font-sans text-sm/normal font-medium', className)} {...others} ref={ref} />
    }
)
const Button = React.forwardRef<HTMLParagraphElement, React.HTMLProps<HTMLParagraphElement>>(
    function Button({ className, ...others }, ref) {
        return <p className={twMerge('font-sans text-sm/relaxed font-bold', className)} {...others} ref={ref} />
    }
)

export {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Body1,
    Body2,
    Button,
}