"use client"

import Link from "next/link";
import * as React from 'react';
import { useInView } from 'react-intersection-observer'

import * as T from '@/components/ui/typography';

import style from './side-catagory.module.css';
import clsx from "clsx";

const catagoriesContext = React.createContext<{
    catagories: CatagoryType[],
    setCatagories: (updator: (cat: CatagoryType[]) => CatagoryType[]) => void
}>({
    catagories: [],
    setCatagories: () => { }
});

export interface CatagoryType {
    depth: 1 | 2 | 3 | 4 | 5 | 6,
    displayName?: string,
    hash?: string,
    active?: boolean,
};

const SideCatagory = React.forwardRef<HTMLDivElement, { className?: string }>(
    function SideCatagory({ className }, ref) {
        const { catagories } = React.useContext(catagoriesContext);

        return (
            <div className={clsx(className, style.SideCatagoryContainer)} ref={ref}>
                {
                    catagories.map((cat, i) => (
                        <Link href={`#${cat.hash}`} key={i}>
                            <T.Body1 className={style.CatagoryLinkItem}
                                data-active={cat.active ?? false}
                                style={{ "--catagory-depth": cat.depth } as React.CSSProperties}>
                                {cat.displayName}
                            </T.Body1>
                        </Link>
                    ))
                }
            </div>
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

const CatagoryContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { hash?: string }>(
    function CatagoryContainer({ hash, children, ...other }, ref) {
        const { setCatagories } = React.useContext(catagoriesContext);

        const { ref: inviewRef } = useInView({
            threshold: 0, triggerOnce: false,
            onChange: (inView) => {
                setCatagories((catagories) => {
                    if (hash == undefined) return catagories;

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