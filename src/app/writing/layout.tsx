import { Metadata } from 'next';


import * as T from "@/components/ui/typography";
import TitleSection from '@/components/layout/title-section';
import TagAwareHeading from '@/components/writings/tag-aware-heading';

import React from 'react';

export default async function Page({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <TitleSection omitDivider>
                <div style={{ width: "100%", display: "flex", alignItems: "center", gap: '1rem' }}>
                    <T.H4 asElement='h1'>
                        The Constellations
                    </T.H4>
                    <TagAwareHeading />
                </div>
                <T.H6 style={{ opacity: .75 }}>
                    The backyard of my mind, where pieces connect.
                </T.H6>
            </TitleSection>
            {children}
        </>
    )
}

export const metadata: Metadata = {
    title: "Zane Chen - The Constellations",
    description: "The Constellations -- The backyard of my mind, where pieces connect.",
};