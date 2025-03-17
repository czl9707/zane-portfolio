"use client"

import { styled } from "@pigment-css/react";
import Link from "next/link";
import * as React from 'react';
import { useInView } from 'react-intersection-observer'

import * as T from '@/components/ui/typography';

const catagoriesUpdatorContext = React.createContext<
    (updator: (cat: CatagoryItemType[]) => CatagoryItemType[]) => void
>(() => { });

const catagoriesContext = React.createContext<CatagoryItemType[]>([]);

interface CatagoryItemType {
    catagoryChildren: CatagoryItemType[],
    displayName: string,
    href: string,
    active: boolean,
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

function Catagory({ catagoryItem, depth = 0 }: {
    catagoryItem: CatagoryItemType,
    depth?: number
}) {
    return (
        <>
            <Link href={`#${catagoryItem.href}`}>
                <CatagoryLinkItem data-active={catagoryItem.active} depth={depth} >
                    {catagoryItem.displayName}
                </CatagoryLinkItem>
            </Link>
            {
                (catagoryItem.catagoryChildren ?? []).map(child => (
                    <Catagory depth={depth + 1} catagoryItem={child} key={catagoryItem.displayName} />
                ))
            }
        </>
    )
}


const SideCatagoryContainer = styled("div")(({ theme }) => ({
    borderRadius: theme.size.border.radius, display: "inline-flex", flexDirection: "column",
    border: `1px solid rgb(${theme.vars.color.default.foreground})`,
    padding: theme.spacing.paragraph, gap: '.5rem'
}))

const SideCatagory = React.forwardRef<HTMLDivElement, { className?: string }>(
    function SideCatagory({ className }, ref) {
        const catagories = React.useContext(catagoriesContext);

        return (
            <SideCatagoryContainer className={className} ref={ref}>
                {
                    catagories.map((cat, i) => (<Catagory catagoryItem={cat} key={i} />))
                }
            </SideCatagoryContainer>
        )
    }
)


function SideCatagoryContextProvider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = React.useState<CatagoryItemType[]>([]);

    return (
        <catagoriesContext.Provider value={content}>
            <catagoriesUpdatorContext.Provider value={setContent} >
                {children}
            </catagoriesUpdatorContext.Provider>
        </catagoriesContext.Provider>
    )
}

const CatagoryContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { catagory: string[] }>(
    function CatagoryContainer({ catagory, children, ...other }, ref) {
        const setCatagory = React.useContext(catagoriesUpdatorContext);

        React.useEffect(() => {
            setCatagory((catagories) => {
                addToCatagories(catagory, catagories);
                return [...catagories];
            })
        });

        const { ref: inviewRef } = useInView({
            threshold: 0, triggerOnce: false,
            onChange: (inView) => {
                setCatagory((catagories) => {
                    let catItem = { catagoryChildren: catagories } as CatagoryItemType;
                    for (const cat of catagory)
                        catItem = catItem.catagoryChildren.find(c => c.displayName === cat) as CatagoryItemType;
                    catItem.active = inView;
                    return [...catagories];
                });
            },
        })

        return <div {...other} id={catagoriesToHashTag(catagory)}
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

const CatagoryLink = React.forwardRef<HTMLAnchorElement, React.HTMLAttributes<HTMLAnchorElement> & { catagory: string[] }>(
    function CatagoryLink({ catagory, children, ...other }, ref) {
        return <Link {...other} href={`#${catagoriesToHashTag(catagory)}`} ref={ref}>{children}</Link>
    }
)

function catagoriesToHashTag(catagory: string[]): string {
    return catagory.map(s => s.replaceAll(" ", " ")).join("-");
}

function addToCatagories(catagory: string[], catagoryItems: CatagoryItemType[], prefix: string[] = []): void {
    let catItem = catagoryItems.find(c => c.displayName === catagory[0]);
    if (catItem === undefined) {
        catItem = {
            catagoryChildren: [],
            displayName: catagory[0],
            href: catagoriesToHashTag([...prefix, ...catagory]),
            active: false,
        };
        catagoryItems.push(catItem);
    }

    if (catagory.length > 1) {
        addToCatagories(catagory.slice(1), catItem.catagoryChildren, [...prefix, catagory[0]])
    }
}

export {
    SideCatagory as CatagoryPanel,
    SideCatagoryContextProvider as Context,
    CatagoryContainer as Container,
    CatagoryLink as Link,
}