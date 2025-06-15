type GraphQLResponse<T> = {
	data: T;
	errors?: any;
};

export async function fetchGraphQL<T>(
	url: string,
	apiKey: string,
	query: string,
	variables?: Record<string, string>,
): Promise<GraphQLResponse<T>> {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({ query, variables }),
	});

	const json = (await response.json()) as GraphQLResponse<T>;

	if (json.errors) {
		console.error('GraphQL Errors:', json.errors);
		throw new Error('GraphQL query failed');
	}

	return json;
}
