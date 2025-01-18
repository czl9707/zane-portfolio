import Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import Button from "./ui/button";
import { twJoin } from "tailwind-merge";

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <Container className={twJoin(
                "bg-neutral/25 my-8 py-4 px-8 rounded flex flex-row border-background border",
                "items-center gap-2 backdrop-blur-md animate-[slide-down_1s_ease-out_forwards]"
            )}>
                <Link href={"/"}>
                    <p className="cursor-pointer font-sans text-2xl font-black">ZANE CHEN</p>
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
            </Container>
        </div>
    )
}