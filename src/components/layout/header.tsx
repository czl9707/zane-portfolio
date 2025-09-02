"use client"

import * as Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Button from "@/components/ui/button";
import { themeVars } from "@/lib/theme";

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import * as React from 'react'

import style from './header.module.css'
import clsx from "clsx";

const NavigationList = ({ children }: { children: React.ReactNode }) => {
    return <NavigationMenu.List className={style.NavigationList}>
        {children}
    </NavigationMenu.List>
}
const MenuContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function MenuContainer({ children, className, ...others }, ref) {
        return <div className={clsx(style.MenuContainer, className)} {...others} ref={ref}>
            {children}
        </div>
    }
)


export default function Header() {
    return (
        <Container.FullWidth className={style.HeaderContainer}
            style={{ backgroundColor: `rgb(${themeVars.color.default.background})` }}>
            <Link href={"/"}>
                <T.H5 style={{ cursor: "pointer", fontWeight: 900 }}>
                    ZANE.C
                </T.H5>
            </Link>

            <div style={{ flex: "1 1" }} />

            <NavigationMenu.Root className={style.ShowOnPhone}>
                <NavigationList>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild>
                            <Button variant="filled" color="transparent"
                                className={style.NavigationTriggerButton}>
                                <span>Works</span>
                                <CaretDownIcon />
                            </Button>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content asChild>
                            <MenuContainer><div>
                                <Link href={"/project/by/developer"}>
                                    <Button variant="filled" color="transparent">Now a Software Engineer</Button>
                                </Link>
                                <Link href={"/project/by/architect"}>
                                    <Button variant="filled" color="transparent">Once an Architect</Button>
                                </Link>
                            </div></MenuContainer>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild>
                            <Button variant="filled" color="transparent"
                                className={style.NavigationTriggerButton}>
                                <span>Writings</span>
                                <CaretDownIcon />
                            </Button>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content asChild>
                            <MenuContainer><div>
                                <Link href={"/blog"}>
                                    <Button variant="filled" color="transparent">Blogs</Button>
                                </Link>
                                <Link href={"/writing"}>
                                    <Button variant="filled" color="transparent">Constellations</Button>
                                </Link>
                            </div></MenuContainer>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>


                    <NavigationMenu.Item asChild>
                        <Link href={"/about"}>
                            <Button variant="filled" color="transparent">About</Button>
                        </Link>
                    </NavigationMenu.Item>
                </NavigationList>
            </NavigationMenu.Root>

            <NavigationMenu.Root className={style.NoShowOnPhone}>
                <NavigationList>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild>
                            <Button variant="filled" color="transparent"
                                style={{ lineHeight: "0" }}>
                                <HamburgerMenuIcon />
                            </Button>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content asChild>
                            <MenuContainer><div>
                                <Link href={"/project/by/developer"}>
                                    <Button variant="filled" color="transparent">Work - Software Engineer</Button>
                                </Link>
                                <Link href={"/project/by/architect"}>
                                    <Button variant="filled" color="transparent">Work - Architect</Button>
                                </Link>
                                <Link href={"/blog"}>
                                    <Button variant="filled" color="transparent">Writings - Blogs</Button>
                                </Link>
                                <Link href={"/writings"}>
                                    <Button variant="filled" color="transparent">Writings - Constellations</Button>
                                </Link>
                                <Link href={"/about"}>
                                    <Button variant="filled" color="transparent">About</Button>
                                </Link>
                            </div></MenuContainer>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationList>
            </NavigationMenu.Root>
        </Container.FullWidth >
    )
}