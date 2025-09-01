
import * as React from 'react';
import clsx from "clsx";

import headingStyle from './heading-with-tag.module.css'

function HeadingWithTag({ className, children}: {className?: string, children: React.ReactElement}) {
    const childNode =  children as React.ReactElement<React.HTMLAttributes<HTMLHeadingElement>, string>;
    return React.cloneElement(
        childNode, {
            ...childNode.props,
            className: clsx(headingStyle.HeadingWithTag, childNode.props.className, className),
        }
    );
}

export default HeadingWithTag;
