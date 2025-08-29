import { redirect } from "next/navigation"

// Keep this for a while
export default async function Page({ params }: {
    params: Promise<{
        roleSlug: string,
        contentSlug: string,
        linkSlug: string,
    }>
}) {
    const {
        roleSlug: role,
        contentSlug: content,
        linkSlug: link,
    } = await params;

    redirect(`/${content}/by/${role}/${link}`)
}