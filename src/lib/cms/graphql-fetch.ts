const ENDPOINT = `${process.env.ADMIN_URL}/api/graphql`;
const APIKey = process.env.ADMIN_APIKEY;

export async function graphqlFetch(query: string, variables: Record<string, unknown> = {}): Promise<Response> {
    return await fetch(
        ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `users API-Key ${APIKey}`,
            },
            body: JSON.stringify({ query, variables }),
        }
    )
}