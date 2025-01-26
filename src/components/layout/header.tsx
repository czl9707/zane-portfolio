import * as Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import Button from "../ui/button";
import { twJoin } from "tailwind-merge";

export default function Header() {
    return (
        <Container.FullWidth className={twJoin(
            "fixed top-0 left-0 right-0 z-50 h-header",
            "py-auto flex flex-row items-center gap-paragraph",
            "bg-background animate-[slide-down_1s_ease-out_forwards]",
        )}>
            <Link href={"/"}>
                <p className="cursor-pointer font-sans text-2xl font-black">ZANE.C</p>
            </Link>
            <div className="flex-1" />
            <Link href={"/#as_a_developer"}>
                <Button>
                    <T.Button>Works</T.Button>
                </Button>
            </Link>
            <Link href={"/blogs"}>
                <Button >
                    <T.Button>Blogs</T.Button>
                </Button>
            </Link>
            <Link href={"/about"}>
                <Button >
                    <T.Button>About</T.Button>
                </Button>
            </Link>
        </Container.FullWidth>
    )
}