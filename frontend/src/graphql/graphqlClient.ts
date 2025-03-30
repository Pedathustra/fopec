const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL

export async function gqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })

  const json = await res.json()

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors)
    throw new Error(json.errors.map((e: any) => e.message).join('\n'))
  }

  return json.data
}