import * as T from "@/components/ui/typography";
import Spacer from "@/components/ui/spacer";
import * as StyledMarkdown from "@/components/ui/markdown";
import Chip from "@/components/ui/chip";
import { Outlined as OutlinedCard, Container } from "@/components/layout/card"   

import { MonthAsString } from "@/lib/utils/date";

import React from "react";


import cardStyle from './content-card.module.css'

export default function ContentCard(
    { title, tags = [], date, description, href, target, rows = 1, columns = 1 }: {
        title: string,
        tags?: string[]
        date: Date,
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
            <T.Body1>{MonthAsString(date)}</T.Body1>
        </div>
        <Chip.Container className={cardStyle.ContentCardTags}>
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

ContentCard.Container = Container;
