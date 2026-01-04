import { CMSError, GraphQLResponseSchema } from "./schemas";
import { z } from "zod";

const ENDPOINT = `${import.meta.env.ADMIN_URL}/api/graphql`;
const APIKey = import.meta.env.ADMIN_APIKEY;

/**
 * Executes a GraphQL query against the CMS API with comprehensive error handling.
 *
 * @param query - The GraphQL query string to execute
 * @param variables - Optional variables to pass to the GraphQL query
 * @returns The parsed JSON response data
 * @throws {CMSError} When the request fails, returns non-200 status, or has GraphQL errors
 *
 * @example
 * ```typescript
 * const data = await graphqlFetch(`
 *   query { ZaneHomepage { whoAmI } }
 * `);
 * ```
 */
export async function graphqlFetch(
    query: string,
    variables: Record<string, unknown> = {}
): Promise<unknown> {
    // Validate environment variables
    if (!ENDPOINT || !APIKey) {
        throw new CMSError(
            "Missing CMS configuration. Ensure ADMIN_URL and ADMIN_APIKEY are set in environment variables."
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

        // Check HTTP status
        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unable to read error response");
            throw new CMSError(
                `CMS API request failed with status ${response.status}: ${response.statusText}`,
                errorText,
                response.status
            );
        }

        // Parse JSON response
        let jsonData: unknown;
        try {
            jsonData = await response.json();
        } catch (parseError) {
            throw new CMSError(
                "Failed to parse JSON response from CMS API",
                parseError
            );
        }

        // Validate basic GraphQL response structure
        const validationResult = GraphQLResponseSchema(z.any()).safeParse(jsonData);
        if (!validationResult.success) {
            throw new CMSError(
                "Invalid GraphQL response structure from CMS",
                validationResult.error
            );
        }

        const { data, errors } = validationResult.data;

        // Check for GraphQL errors
        if (errors && errors.length > 0) {
            const errorMessages = errors.map(e => e.message).join(", ");
            throw new CMSError(
                `GraphQL query errors: ${errorMessages}`,
                errors
            );
        }

        // Check if data is null
        if (data === null) {
            throw new CMSError(
                "GraphQL query returned null data"
            );
        }

        return data;

    } catch (error) {
        // Re-throw CMSError as-is
        if (error instanceof CMSError) {
            throw error;
        }

        // Wrap fetch errors (network issues, timeouts, etc.)
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new CMSError(
                "Network error while connecting to CMS API. Check your internet connection and CMS URL.",
                error
            );
        }

        // Wrap any other unexpected errors
        throw new CMSError(
            "Unexpected error during CMS API request",
            error
        );
    }
}