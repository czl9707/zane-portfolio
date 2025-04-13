"use client"

import { styled } from "@pigment-css/react";
import Link from "next/link";
import * as React from 'react';
import { useInView } from 'react-intersection-observer'

import * as T from '@/components/ui/typography';

const catagoriesContext = React.createContext<{
    catagories: CatagoryType[],
    setCatagories: (updator: (cat: CatagoryType[]) => CatagoryType[]) => void
}>({
    catagories: [],
    setCatagories: () => { }
});


interface CatagoryType {
    depth: 1 | 2 | 3 | 4 | 5 | 6,
    displayName: string,
    hash: string,
    active?: boolean,
};

const CatagoryLinkItem = styled(T.Body1)<{ depth: number }>(({ theme }) => ({
    padding: ({ depth }) => `.25rem ${theme.vars.spacing.paragraph} .25rem  calc(${depth * 1.5}rem + ${theme.vars.spacing.paragraph})`,
    backgroundColor: "transparent", borderRadius: theme.size.border.radius,
    transition: `background-color ${theme.transition.short}`,

    "&[data-active=true]": {
        backgroundColor: `rgb(${theme.vars.color.default.foreground} / 25%)`
    },
    "&[data-active=false]": {
        "&:hover": {
            backgroundColor: `rgb(${theme.vars.color.default.foreground} / 10%)`
        },
    },
}))

const SideCatagoryContainer = styled("div")(({ theme }) => ({
    borderRadius: theme.size.border.radius, display: "inline-flex", flexDirection: "column",
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    padding: theme.spacing.paragraph, gap: '.5rem'
}))

const SideCatagory = React.forwardRef<HTMLDivElement, { className?: string }>(
    function SideCatagory({ className }, ref) {
        const { catagories } = React.useContext(catagoriesContext);

        return (
            <SideCatagoryContainer className={className} ref={ref}>
                {
                    catagories.map((cat, i) => (
                        <Link href={`#${cat.hash}`} key={i}>
                            <CatagoryLinkItem data-active={cat.active ?? false} depth={cat.depth} >
                                {cat.displayName}
                            </CatagoryLinkItem>
                        </Link>
                    ))
                }
            </SideCatagoryContainer>
        )
    }
)


function SideCatagoryContextProvider({ children, catagories: catagoriesBase }: {
    children: React.ReactNode, catagories: CatagoryType[]
}) {
    const [catagories, setCatagories] = React.useState<CatagoryType[]>(catagoriesBase);

    return (
        <catagoriesContext.Provider value={{ catagories, setCatagories }}>
            {children}
        </catagoriesContext.Provider>
    )
}

const CatagoryContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { hash: string }>(
    function CatagoryContainer({ hash, children, ...other }, ref) {
        const { setCatagories } = React.useContext(catagoriesContext);

        const { ref: inviewRef } = useInView({
            threshold: 0, triggerOnce: false,
            onChange: (inView) => {
                setCatagories((catagories) => {
                    const catItem = catagories.find(cat => cat.hash === hash);
                    catItem!.active = inView;
                    return [...catagories];
                });
            },
        })

        return <div {...other}
            ref={(node: HTMLDivElement | null) => {
                inviewRef(node);
                if (ref != null) {
                    if (typeof ref === 'function') ref(node);
                    else ref.current = node;
                }
            }}>
            {children}
        </div>
    }
)

const CatagoryLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    function CatagoryLink({ href, children, ...other }, ref) {
        return <Link {...other} href={href as string} ref={ref}>{children}</Link>
    }
)

export {
    SideCatagory as CatagoryPanel,
    SideCatagoryContextProvider as Context,
    CatagoryContainer as Container,
    CatagoryLink as Link,
}