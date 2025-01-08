import * as React from 'react'

const Container = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function Container({ className, ...other }, ref) {
        return <div {...other} ref={ref} className={'max-w-5xl w-[calc(100vw-10rem)] mx-auto ' + className} />
    }
)


export default Container;