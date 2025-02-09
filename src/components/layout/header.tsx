"use client"

import * as Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import Button from "../ui/button";
import { twJoin } from "tailwind-merge";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Header() {
    return (
        <Container.FullWidth className={twJoin(
            "fixed top-0 left-0 right-0 z-50 h-header",
            "py-auto flex flex-row items-center gap-paragraph",
            "bg-background animate-slideDown",
        )}>
            <Link href={""}>
                <p className="cursor-pointer font-sans text-2xl font-black">ZANE.C</p>
            </Link>

            <div className="flex-1" />

            <NavigationMenu.Root className="hidden sm:block">
                <NavigationMenu.List className="flex flex-row gap-paragraph items-center">
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild className="group/trigger">
                            <Button className="flex flex-row gap-2 items-center">
                                <T.Button>Works</T.Button>
                                <CaretDownIcon className="group-data-[state=open]/trigger:-rotate-180 duration-150" />
                            </Button>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content asChild>
                            <div className="relative animate-slideUp [animation-duration:300ms]">
                                <div className={twJoin(
                                    "flex flex-col items-stretch rounded bg-neutral py-2 absolute top-2 w-max",
                                )}>
                                    <Link href={"/as/developer/project"}>
                                        <Button>
                                            <T.Button>Now a Software Engineer</T.Button>
                                        </Button>
                                    </Link>
                                    <Link href={"/as/architect/project"}>
                                        <Button>
                                            <T.Button>Once an Architect</T.Button>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item asChild>
                        <Link href={"/as/developer/blog"}>
                            <Button >
                                <T.Button>Blogs</T.Button>
                            </Button>
                        </Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item asChild>
                        <Link href={"/about"}>
                            <Button >
                                <T.Button>About</T.Button>
                            </Button>
                        </Link>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </NavigationMenu.Root>

            <NavigationMenu.Root className="sm:hidden block">
                <NavigationMenu.List>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger asChild>
                            <Button><HamburgerMenuIcon /></Button>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content asChild>
                            <div className="relative w-full animate-slideUp [animation-duration:300ms]">
                                <div className={twJoin(
                                    "flex flex-col items-stretch rounded bg-neutral py-2 absolute top-2 right-0 w-max",
                                )}>
                                    <Link href={"/as/developer/project"}>
                                        <Button>
                                            <T.Button>Work - Software Engineer</T.Button>
                                        </Button>
                                    </Link>
                                    <Link href={"/as/architect/project"}>
                                        <Button>
                                            <T.Button>Work - Architect</T.Button>
                                        </Button>
                                    </Link>
                                    <Link href={"/as/developer/blog"}>
                                        <Button >
                                            <T.Button>Blogs</T.Button>
                                        </Button>
                                    </Link>
                                    <Link href={"/about"}>
                                        <Button >
                                            <T.Button>About</T.Button>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </NavigationMenu.Root>

        </Container.FullWidth>
    )
}