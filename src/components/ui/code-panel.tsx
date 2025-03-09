"use client"

import { styled } from '@pigment-css/react';
import * as React from 'react';

import { CopyIcon } from '@radix-ui/react-icons'

const InlineCodeBlock = styled("code")(({ theme }) => ({
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15%)`,
    borderRadius: theme.size.border.radius, paddingLeft: '.5rem', paddingRight: ".5rem"
}))

const CodePanelContainer = styled("pre")(({ theme }) => ({
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 10%)`,
    borderRadius: theme.size.border.radius, position: "relative",
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    padding: theme.spacing.paragraph, margin: 0,
    overflowX: "scroll",

    [`${InlineCodeBlock}`]: {
        fontFamily: theme.typographies.body2.fontFamily,
        fontSize: theme.typographies.body2.fontSize,
        fontWeight: theme.typographies.body2.fontWeight,
        lineHeight: theme.typographies.body2.lineHeight,
        display: "inline-block",
        backgroundColor: "transparent",
    },

    "&::-webkit-scrollbar": {
        height: ".5rem", margin: ".1rem"
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: `rgb(${theme.vars.color.default.foreground} / 10%)`,
        borderRadius: ".5rem",
    },
    "&::-webkit-scrollbar-button": {
        backgroundColor: "transparent", width: 0,
    },
}))

const IconContainer = styled("div")(({ theme }) => ({
    position: "absolute", right: theme.spacing.paragraph, top: theme.spacing.paragraph,
    borderRadius: theme.size.border.radius,
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    backgroundColor: `transparent`, padding: ".3rem", margin: 0,

    transition: `all ${theme.transition.short}`,

    "&:hover": { backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15%)`, },
    "&:active": { backgroundColor: `rgb(${theme.vars.color.default.foreground} / 30%)`, },
}));

const CodePanel = React.forwardRef<HTMLPreElement, React.HTMLAttributes<HTMLPreElement>>(
    function CodePanel({ children, ...other }, ref) {
        // const handleCopy = () => {
        //     navigator.clipboard.writeText();
        // }

        return (
            <CodePanelContainer {...other} ref={ref} >
                {children}
                <IconContainer
                // onClick={handleCopy}
                >
                    <CopyIcon width={"1.5rem"} height={"1.5rem"} />
                </IconContainer>
            </CodePanelContainer>
        );
    }
)

export { CodePanel, InlineCodeBlock as CodeBlock };