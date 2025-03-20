"use client"

import * as Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import { solidBackground } from "@/components/ui/util";
import Button from "@/components/ui/button";
import * as SlideUp from "@/components/ui/slideup-effect";


import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { css, keyframes, styled } from "@pigment-css/react";

const slideDownEffect = keyframes({
    from: { transform: "translateY(-100%)", },
    to: { transform: "none", },
})


const HeaderContainer = styled(Container.FullWidth)(({ theme }) => ({
    position: "fixed", top: 0, height: theme.size.header.height,
    zIndex: 50, width: "100vw",
    display: "flex", flexDirection: "row", alignItems: "center", gap: theme.spacing.paragraph,
    animation: `${slideDownEffect} ${theme.transition.long} ease-out forwards`,
}));

const MenuContainer = styled("div")(({ theme }) => ({
    position: "relative",
    "&>div": {
        animation: `${SlideUp.effect} ${theme.transition.short} ease-out both`,
        display: "flex", position: "absolute",
        flexDirection: "column", alignItems: "stretch", borderRadius: theme.size.border.radius,
        paddingTop: ".5rem", paddingBottom: ".5rem", top: ".5rem", right: 0, width: "max-content",
        backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15% )`,
        backdropFilter: "blur(1rem)"
    },
}))

const NavigationTriggerWithChildren = styled(NavigationMenu.Trigger)(({ theme }) => ({
    svg: { transitionDuration: theme.transition.short },
    "&[state=open]": {
        svg: { transform: "rotate(180deg)" }
    },
}));
const NavigationList = styled(NavigationMenu.List)(({ theme }) => ({
    display: "flex", flexDirection: "row",
    gap: theme.spacing.paragraph, alignItems: "center"
}))

export default function Header() {
    return (
        <HeaderContainer className={solidBackground}>
            <Link href={"/"}>
                <T.H5 style={{ cursor: "pointer", fontWeight: 900 }}>
                    ZANE.C
                </T.H5>
            </Link>

            <div style={{ flex: "1 1" }} />

            <NavigationMenu.Root className={css(({ theme }) => {
                return ({
                    display: "block",
                    [`@media(max-width: ${theme.breakpoint.sm})`]: { display: "none", }
                })
            })}>
                <NavigationList>
                    <NavigationMenu.Item>
                        <NavigationTriggerWithChildren asChild>
                            <Button style={{ display: "flex", flexDirection: "row", gap: ".5rem", alignItems: "center" }}>
                                <span>Works</span>
                                <CaretDownIcon />
                            </Button>
                        </NavigationTriggerWithChildren>
                        <NavigationMenu.Content asChild>
                            <MenuContainer><div>
                                <Link href={"/as/developer/project"}>
                                    <Button>Now a Software Engineer</Button>
                                </Link>
                                <Link href={"/as/architect/project"}>
                                    <Button>Once an Architect</Button>
                                </Link>
                            </div></MenuContainer>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item asChild>
                        <Link href={"/as/developer/blog"}>
                            <Button>Blogs</Button>
                        </Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item asChild>
                        <Link href={"/about"}>
                            <Button>About</Button>
                        </Link>
                    </NavigationMenu.Item>
                </NavigationList>
            </NavigationMenu.Root>

            <NavigationMenu.Root className={css(({ theme }) => ({
                display: "block",
                [`@media(min-width: ${theme.breakpoint.sm})`]: { display: "none", }
            }))}>
                <NavigationList>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild>
                            <Button style={{ lineHeight: "0" }}><HamburgerMenuIcon /></Button>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content asChild>
                            <MenuContainer><div>
                                <Link href={"/as/developer/project"}>
                                    <Button>Work - Software Engineer</Button>
                                </Link>
                                <Link href={"/as/architect/project"}>
                                    <Button>Work - Architect</Button>
                                </Link>
                                <Link href={"/as/developer/blog"}>
                                    <Button>Blogs</Button>
                                </Link>
                                <Link href={"/about"}>
                                    <Button>About</Button>
                                </Link>
                            </div></MenuContainer>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationList>
            </NavigationMenu.Root>
        </HeaderContainer >
    )
}