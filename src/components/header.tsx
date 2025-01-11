import Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import Button from "./ui/button";

export default function Header() {
    return (
        <Container className={`sticky bg-foreground my-8 py-4 px-8 rounded-sm flex flex-row items-center gap-2`}>
            <Link href={"/"}>
                <p className="cursor-pointer font-sans text-2xl font-black">Zane Chen</p>
            </Link>
            <div className="flex-1" />
            <Link href={"/Works"}>
                <Button color="green">
                    <T.Button className="cursor-pointer">Works</T.Button>
                </Button>
            </Link>
            <Link href={"/Blogs"}>
                <Button color="green" variant="outline">
                    <T.Button className="cursor-pointer">Blogs</T.Button>
                </Button>
            </Link>
            <Link href={"/"}>
                <Button color="transparent">
                    <T.Button className="cursor-pointer">About</T.Button>
                </Button>
            </Link>
        </Container>
    )
}