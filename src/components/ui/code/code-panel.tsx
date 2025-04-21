"use client"

import { CopyIcon } from '@radix-ui/react-icons'
import * as Tabs from '@radix-ui/react-tabs'
import * as React from 'react';
import clsx from 'clsx';

import * as T from '@/components/ui/typography';

import style from './code-panel.module.css'

const CodePanelRoot = React.forwardRef<HTMLDivElement, Tabs.TabsProps & React.HTMLAttributes<HTMLDivElement>>(
    function CodePanelRoot({ className, ...others }, ref) {
        return (<Tabs.Root className={clsx(className, style.TabsRoot)}
            {...others} ref={ref} />)
    }
)

const CodePanelList = React.forwardRef<HTMLDivElement, Tabs.TabsListProps>(
    function CodePanelList({ children, className, ...others }, ref) {
        return <Tabs.List className={clsx(className, style.TabsList)}
            {...others} ref={ref} >
            <div>{children}</div>
        </Tabs.List>
    }
)

const CodePanelTrigger = React.forwardRef<HTMLButtonElement, Tabs.TabsTriggerProps>(
    function CodePanelTrigger({ children, ...others }, ref) {
        return <Tabs.Trigger {...others} ref={ref} asChild>
            <T.Body1 className={style.TabsTriggerText}>{children}</T.Body1>
        </Tabs.Trigger>
    }
)

const CodePanelContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { copiableText: string, tabName: string }>(
    function CodePanelContent({ children, copiableText, tabName, className, ...other }, ref) {
        const handleCopy = () => {
            navigator.clipboard.writeText(copiableText);
        }

        return (
            <Tabs.Content className={style.TabsContent} value={tabName}>
                <code className={clsx(style.CodeContainer, className)}
                    {...other} ref={ref}>
                    {children}
                </code>
                <div className={style.IconContainer} onClick={handleCopy}>
                    <CopyIcon width={"1.5rem"} height={"1.5rem"} />
                </div>
            </Tabs.Content>
        );
    }
)

export {
    CodePanelRoot as Root,
    CodePanelContent as Content,
    CodePanelList as List,
    CodePanelTrigger as Trigger,
};