import WritingsCollection from '@/components/writings/writings-collection';

export default async function Page({ params }: {
    params: Promise<{ tagSlug: string }>
}) {
    const { tagSlug: tag } = await params;

    return <WritingsCollection tag={tag} />
}