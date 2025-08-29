import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { ContentType, RoleType } from "@/lib/constants"
import * as ArchProjectContent from "@/components/arch-project/content-page"
import * as BlogContent from "@/components/blog/content-page"

export const revalidate = 14400;

export default async function Page({ params }: {
    params: Promise<{
        roleSlug: RoleType,
        contentSlug: ContentType,
        linkSlug: string,
    }>
}) {
    const {
        roleSlug: role,
        contentSlug: content,
        linkSlug: link,
    } = await params;

    if (role === "architect" && content === "project")
        return <ArchProjectContent.Page link={link} />
    else if (content === "blog")
        return <BlogContent.Page role={role} link={link} />
    else
        return notFound()
}

export async function generateMetadata({ params }: {
    params: Promise<{
        roleSlug: RoleType,
        contentSlug: ContentType,
        linkSlug: string,
    }>
}): Promise<Metadata> {
    const {
        roleSlug: role,
        contentSlug: content,
        linkSlug: link,
    } = await params;

    if (role === "architect" && content === "project")
        return ArchProjectContent.generateMetadata(link);
    else if (content === "blog")
        return BlogContent.generateMetadata(role, link);
    else
        return notFound()
}

export async function generateStaticParams(): Promise<{
    roleSlug: RoleType,
    contentSlug: ContentType,
    linkSlug: string,
}[]> {
    const archProjectSlugs = (await ArchProjectContent.generateStaticParams()).map(
        link => ({
            roleSlug: "architect" as RoleType,
            contentSlug: "project" as ContentType,
            linkSlug: link
        })
    )
    const blogSlugs = (await BlogContent.generateStaticParams()).map(
        b => ({
            roleSlug: b.role,
            contentSlug: "blog" as ContentType,
            linkSlug: b.link
        })
    )

    return [...archProjectSlugs, ...blogSlugs];
}