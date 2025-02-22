import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import Link from "next/link";
import Divider from "@/components/ui/divider";

export default function Footer() {
    return (
        <Container.FullWidth className="py-group">
            <Divider />
            <Grid columns={3} className="mt-group">
                <T.Body2 className="text-foreground/50 col-span-1">© 2024-present Zane Chen. All Rights Reserved.</T.Body2>
                <div className="w-full flex flex-row align-baseline gap-group -col-end-1">
                    <span style={{ flex: "1 1" }} />
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
            </Grid>
        </Container.FullWidth>
    )
}