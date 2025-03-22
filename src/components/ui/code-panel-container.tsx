"use client"

import { styled } from "@pigment-css/react";
import { CopyIcon } from '@radix-ui/react-icons'
import * as React from 'react';

const CodePanelContainer = styled("div")(({ theme }) => ({
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 5%)`,
    borderRadius: theme.size.border.radius, position: "relative",
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
}))

const CodeContainer = styled("code")(({ theme }) => ({
    overflowX: "scroll", display: "block",
    paddingBottom: theme.spacing.paragraph,
    margin: `${theme.spacing.paragraph} ${theme.spacing.paragraph} 0 ${theme.spacing.paragraph}`,

    fontFamily: theme.typographies.code.fontFamily,
    fontSize: theme.typographies.code.fontSize,
    fontWeight: theme.typographies.code.fontWeight,
    lineHeight: theme.typographies.code.lineHeight,

    "&::-webkit-scrollbar": {
        height: ".25rem", margin: ".1rem"
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: `rgb(${theme.vars.color.default.foreground} / 20%)`,
        borderRadius: ".25rem",
    },
    "&::-webkit-scrollbar-button": {
        backgroundColor: "transparent", width: 0,
    },
}))

const IconContainer = styled("div")(({ theme }) => ({
    position: "absolute", right: theme.spacing.paragraph, top: theme.spacing.paragraph, lineHeight: 0,
    borderRadius: theme.size.border.radius,
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 5%)`, backdropFilter: "blur(1rem)",
    padding: ".3rem", margin: 0,

    transition: `all ${theme.transition.short}`,

    "&:hover": { backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15%)`, },
    "&:active": { backgroundColor: `rgb(${theme.vars.color.default.foreground} / 30%)`, },
}));


const CodePanel = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { copiableText: string }>(
    function CodePanel({ children, copiableText, ...other }, ref) {
        const handleCopy = () => {
            navigator.clipboard.writeText(copiableText);
        }

        return (
            <CodePanelContainer>
                <CodeContainer {...other} ref={ref}>
                    {children}
                </CodeContainer>
                <IconContainer onClick={handleCopy}>
                    <CopyIcon width={"1.5rem"} height={"1.5rem"} />
                </IconContainer>
            </CodePanelContainer>
        );
    }
)

export default CodePanel;