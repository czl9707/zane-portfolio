import Container from "@/components/ui/container";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

export default function Footer() {
    return (
        <Container className={twJoin(
            "border-t border-foreground/50 mt-16 py-8",
            "grid grid-cols-1 sm:grid-cols-2 gap-8"
        )}>
            <T.Body2 className="text-foreground/50">© 2024-present Zane Chen. All Rights Reserved.</T.Body2>
            <div className="w-full flex flex-row align-baseline gap-8">
                <div className="flex-1" />
                <Link href={"mailto:czl970721@gmail.com"}>
                    <T.Body1><u>Email</u></T.Body1>
                </Link>
                <Link href={"https://www.linkedin.com/in/zeling-chen"}>
                    <T.Body1><u>Linkedin</u></T.Body1>
                </Link>
                <Link href={"https://github.com/czl9707"}>
                    <T.Body1><u>Github</u></T.Body1>
                </Link>
            </div>
        </Container>
    )
}