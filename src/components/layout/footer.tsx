import * as Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import * as T from "@/components/ui/typography";
import Divider from "@/components/ui/divider";
import Spacer from "@/components/ui/spacer";

import Link from "next/link";
import { css } from "@pigment-css/react";

export default function Footer() {
    return (
        <Container.FullWidth className={css(({ theme }) => ({
            paddingBottom: theme.spacing.group, paddingTop: theme.spacing.group,
        }))}>
            <Divider />
            <Spacer spacing="group" />
            <Grid columns={3}>
                <T.Body2 style={{ opacity: .5, gridColumn: "span 1 / span 1" }}>
                    © 2024-present Zane Chen. All Rights Reserved.
                </T.Body2>

                <div className={css(({ theme }) => ({
                    width: "100%", display: "flex", flexDirection: "row",
                    verticalAlign: "baseline", gap: theme.spacing.group, gridColumnEnd: -1
                }))}>
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
        </Container.FullWidth >
    )
}