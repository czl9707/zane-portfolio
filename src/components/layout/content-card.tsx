import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as StyledMarkdown from "@/components/ui/markdown";
import Chip from "@/components/ui/chip";
import { Outlined as OutlinedCard, Container as CardContainer } from "@/components/layout/card"

import { type RoleType, displayRole } from "@/lib/constants";
import { MonthAsString } from "@/lib/utils/date";

import React, { HTMLAttributes } from "react";

import cardStyle from './content-card.module.css'
import clsx from "clsx";


export default function ContentCard(
    { title, role, tags = [], date, description, href, target, rows = 1, columns = 1 }: {
        title: string,
        tags?: string[]
        role?: RoleType
        date?: Date,
        description?: string
        href: string,
        target?: React.HTMLAttributeAnchorTarget,
        columns?: number,
        rows?: number,
    }
) {
    return <OutlinedCard className={cardStyle.ContentCard}
        rows={rows} columns={columns} href={href} target={target}>

        <div className={cardStyle.ContentCardTitle}>
            <T.H6>{title}</T.H6>
            {
                date != undefined &&
                <T.Body1 >{MonthAsString(date)}</T.Body1>
            }
        </div>

        <Chip.Container className={cardStyle.ContentCardTags}>
            {
                role != undefined &&
                <Chip color="galaxy"><T.Body2>by a {displayRole(role)}</T.Body2></Chip>
            }
            {tags.map(t => <Chip key={t}><T.Body2>{t}</T.Body2></Chip>)}
        </Chip.Container>

        {
            description != undefined && <>
                <Spacer spacing="paragraph" />
                <StyledMarkdown.Default className={cardStyle.ContentCardDescription}>
                    {description}
                </StyledMarkdown.Default>
            </>
        }
    </OutlinedCard>
}

const ContentCardContainer = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    function ContentCardContainer({className, children, ...other}, ref)
    {
        return <CardContainer className={clsx(className, cardStyle.ContentCardContainer)}
            {...other} ref={ref}>
            {children}
        </CardContainer>
    }
)

ContentCard.Container = ContentCardContainer;
