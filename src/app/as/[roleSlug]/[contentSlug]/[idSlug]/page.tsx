import { redirect } from "next/navigation"

// Keep this for a while
export default async function Page({ params }: {
    params: Promise<{
        roleSlug: string,
        contentSlug: string,
        idSlug: string,
    }>
}) {
    const {
        roleSlug: role,
        contentSlug: content,
        idSlug: id,
    } = await params;

    redirect(`/${content}/by/${role}/${id}`)
}