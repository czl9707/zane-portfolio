import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { ContentType, RoleType } from "@/lib/constants"
import TitleSection from '@/components/layout/title-section';
import * as ArchProjectCollection from "@/components/arch-project/collection-page"
import * as DevProjectCollection from "@/components/dev-project/collection-page"
import * as BlogCollection from "@/components/writings/blog-collection-page"

export const revalidate = 14400;

export default async function Page({ params }: {
    params: Promise<{
        roleSlug: RoleType,
        contentSlug: ContentType,
    }>
}) {
    const {roleSlug: role, contentSlug: content} = await params;

    return (
        <>
            <TitleSection omitDivider>
                <TitleSection.Heading asElement='h1'>
                    {headingText(role, content)}
                </TitleSection.Heading>
            </TitleSection>

            <CollectionPageBody role={role} content={content}/>
        </>
    )
}

function headingText(role: RoleType, content: ContentType)
{
    if (role === "architect" && content === "project")
        return "Architecture Projects";
    else if (role === "developer" && content === "project")
        return "Dev Projects"
    else if (content === "blog")
        return "Blogs"
    else
        return notFound()
}

function CollectionPageBody({role, content}:{
    role: RoleType, content: ContentType
})
{
    if (role === "architect" && content === "project")
        return <ArchProjectCollection.Page/>
    else if (role === "developer" && content === "project")
        return <DevProjectCollection.Page/>
    else if (content === "blog")
        return <BlogCollection.Page/>
    else
        return notFound()
}

export async function generateMetadata({ params }: {
    params: Promise<{
        roleSlug: RoleType,
        contentSlug: ContentType,
    }>
}): Promise<Metadata> {
    const {roleSlug: role, contentSlug: content} = await params;
    if (role === "architect" && content === "project")
        return ArchProjectCollection.metadata;
    else if (role === "developer" && content === "project")
        return DevProjectCollection.metadata;
    else if (content === "blog")
        return BlogCollection.metadata;
    else 
        return notFound();
}

