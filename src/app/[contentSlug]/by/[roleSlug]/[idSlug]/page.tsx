import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { ContentType, RoleType } from "@/lib/constants"
import * as ArchProjectContent from "@/components/arch-project/content-page"
import * as BlogContent from "@/components/writings/blog-content-page"
import * as NoteContent from "@/components/writings/note-content-page"

export const revalidate = 14400;
export const dynamic = 'auto'

export default async function Page({ params }: {
    params: Promise<{
        roleSlug: RoleType,
        contentSlug: ContentType,
        idSlug: string,
    }>
}) {
    const {
        roleSlug: role,
        contentSlug: content,
        idSlug: id,
    } = await params;

    if (role === "architect" && content === "project")
        return <ArchProjectContent.Page id={id} />
    else if (content === "blog")
        return <BlogContent.Page role={role} id={id} />
    else if (content === "note")
        return <NoteContent.Page role={role} id={id} />
    else
        return notFound()
}

export async function generateMetadata({ params }: {
    params: Promise<{
        roleSlug: RoleType,
        contentSlug: ContentType,
        idSlug: string,
    }>
}): Promise<Metadata> {
    const {
        roleSlug: role,
        contentSlug: content,
        idSlug: id,
    } = await params;

    if (role === "architect" && content === "project")
        return ArchProjectContent.generateMetadata(id);
    else if (content === "blog")
        return BlogContent.generateMetadata(role, id);
    else if (content === "note")
        return NoteContent.generateMetadata(role, id);
    else
        return notFound()
}

export async function generateStaticParams(): Promise<{
    roleSlug: RoleType,
    contentSlug: ContentType,
    idSlug: string,
}[]> {
    const archProjectSlugs = (await ArchProjectContent.generateStaticParams()).map(
        id => ({
            roleSlug: "architect" as RoleType,
            contentSlug: "project" as ContentType,
            idSlug: id
        })
    )
    const blogSlugs = (await BlogContent.generateStaticParams()).map(
        b => ({
            roleSlug: b.role,
            contentSlug: "blog" as ContentType,
            idSlug: b.id
        })
    )
    const noteSlugs = (await NoteContent.generateStaticParams()).map(
        n => ({
            roleSlug: n.role,
            contentSlug: "note" as ContentType,
            idSlug: n.id
        })
    )

    return [...archProjectSlugs, ...blogSlugs, ...noteSlugs];
}