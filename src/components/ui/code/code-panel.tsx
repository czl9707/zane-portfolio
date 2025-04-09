"use client"

import { styled } from "@pigment-css/react";
import { CopyIcon } from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs'
import * as React from 'react';

import * as T from '@/components/ui/typography';

const StyledRoot = styled(Tabs.Root)(({ theme }) => ({
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 5%)`,
    borderRadius: theme.size.border.radius, position: "relative",
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    padding: theme.spacing.paragraph
}))

const CodePanelRoot = React.forwardRef<HTMLDivElement, Tabs.TabsProps>(
    function CodePanelContainer(props, ref) {
        return <StyledRoot {...props} ref={ref} />
    }
)

const StyledCodePanelList = styled(Tabs.List)(({ theme }) => ({
    overflowX: "scroll",
    borderBottom: `1px solid rgb(${theme.vars.color.default.foreground} / 50%)`,
    marginBottom: theme.spacing.paragraph,
    paddingBottom: ".25rem",

    "&::-webkit-scrollbar": {
        display: "none"
    },
    "& > div": {
        display: "inline-flex", flexDirection: "row",
        gap: theme.spacing.paragraph,
    }
}))

const CodePanelList = React.forwardRef<HTMLDivElement, Tabs.TabsListProps>(
    function CodePanelList({ children, ...others }, ref) {
        return <StyledCodePanelList {...others} ref={ref}>
            <div>{children}</div>
        </StyledCodePanelList>
    }
)

const StyledTriggerBody = styled(T.Body1)(({ theme }) => ({
    color: `rgb(${theme.vars.color.default.foreground} / 50%)`,
    transition: `color ${theme.transition.short}`,
    userSelect: 'none',

    "&:hover": { color: `rgb(${theme.vars.color.default.foreground} / 75%)`, },
    "&[data-state='active']": { color: `rgb(${theme.vars.color.default.foreground})`, }
}))

const CodePanelTrigger = React.forwardRef<HTMLButtonElement, Tabs.TabsTriggerProps>(
    function CodePanelTrigger({ children, ...others }, ref) {
        return <Tabs.Trigger {...others} ref={ref} asChild>
            <StyledTriggerBody>{children}</StyledTriggerBody>
        </Tabs.Trigger>
    }
)

const CodeContainer = styled("code")(({ theme }) => ({
    overflowX: "scroll", display: "block",

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
    position: "absolute", right: 0, top: 0, lineHeight: 0,
    borderRadius: theme.size.border.radius,
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 5%)`, backdropFilter: "blur(1rem)",
    padding: ".3rem", margin: 0,

    transition: `all ${theme.transition.short}`,

    "&:hover": { backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15%)`, },
    "&:active": { backgroundColor: `rgb(${theme.vars.color.default.foreground} / 30%)`, },
}));

const StyledContent = styled(Tabs.Content)({
    position: "relative",
});

const CodePanelContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { copiableText: string, tabName: string }>(
    function CodePanelContent({ children, copiableText, tabName, ...other }, ref) {
        const handleCopy = () => {
            navigator.clipboard.writeText(copiableText);
        }

        return (
            <StyledContent value={tabName}>
                <CodeContainer {...other} ref={ref}>
                    {children}
                </CodeContainer>
                <IconContainer onClick={handleCopy}>
                    <CopyIcon width={"1.5rem"} height={"1.5rem"} />
                </IconContainer>
            </StyledContent>
        );
    }
)

export {
    CodePanelRoot as Root,
    CodePanelContent as Content,
    CodePanelList as List,
    CodePanelTrigger as Trigger,
};