import Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";

export default function Header() {
    return (
        <Container className={`sticky bg-foreground my-8 py-3 px-8 rounded-sm flex flex-row items-center gap-8`}>
            <Link href={"/"}>
                <p className="cursor-pointer font-sans text-2xl font-black">Zane Chen</p>
            </Link>
            <div className="flex-1" />
            <Link href={"/Works"}>
                <T.Button className="cursor-pointer">Works</T.Button>
            </Link>
            <Link href={"/Blogs"}>
                <T.Button className="cursor-pointer">Blogs</T.Button>
            </Link>
            <Link href={"/"}>
                <T.Button className="cursor-pointer">About</T.Button>
            </Link>
        </Container>
    )
}