import { CMSError, GraphQLResponseSchema } from "./schemas";
import { z } from "zod";

const ENDPOINT = `${import.meta.env.ADMIN_URL}/api/graphql`;
const APIKey = import.meta.env.ADMIN_APIKEY;

/**
 * Executes a GraphQL query against the CMS API with comprehensive error handling and validation.
 *
 * @template T - The expected type of the response data
 * @param query - The GraphQL query string to execute
 * @param responseSchema - Zod schema to validate and parse the response data
 * @param variables - Optional variables to pass to the GraphQL query
 * @returns The validated and typed response data
 * @throws {CMSError} When the request fails, returns non-200 status, or has GraphQL errors
 *
 * @example
 * ```typescript
 * const responseSchema = z.object({
 *   ZaneHomepage: HomepageDtoSchema
 * });
 *
 * const data = await graphqlFetch(
 *   `query { ZaneHomepage { whoAmI } }`,
 *   responseSchema
 * );
 * // data is typed as { ZaneHomepage: HomepageDto }
 * ```
 */
export async function graphqlFetch<T>(
    query: string,
    responseSchema: z.ZodType<T>,
    variables: Record<string, unknown> = {}
): Promise<T> {
    if (!ENDPOINT || !APIKey) {
        throw new CMSError(
            "Missing CMS configuration. Ensure ADMIN_URL and ADMIN_APIKEY are set."
        );
    }

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `users API-Key ${APIKey}`,
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unable to read response");
            throw new CMSError(
                `HTTP ${response.status}: ${response.statusText}`,
                errorText,
                response.status
            );
        }

        const jsonData = await response.json().catch((err) => {
            throw new CMSError("Failed to parse JSON response", err);
        });

        // Validate GraphQL response wrapper
        const wrapperResult = GraphQLResponseSchema(z.any()).safeParse(jsonData);
        if (!wrapperResult.success) {
            throw new CMSError("Invalid GraphQL response structure", wrapperResult.error);
        }

        const { data, errors } = wrapperResult.data;

        // Check for GraphQL errors
        if (errors?.length) {
            throw new CMSError(
                `GraphQL errors: ${errors.map(e => e.message).join(", ")}`,
                errors
            );
        }

        if (data === null) {
            throw new CMSError("GraphQL query returned null data");
        }

        // Validate response data against provided schema
        const validationResult = responseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new CMSError("Invalid response data structure", validationResult.error);
        }

        return validationResult.data;

    } catch (error) {
        if (error instanceof CMSError) throw error;

        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new CMSError("Network error connecting to CMS", error);
        }

        throw new CMSError("Unexpected error during CMS request", error);
    }
}