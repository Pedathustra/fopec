import { gqlRequest } from './graphqlClient';

export async function createBusinessFocus(
  description: string
): Promise<number> {
  const mutation = `
    mutation($description: String!) {
      insertBusinessFocus(description: $description)
    }
  `;
  const data = await gqlRequest<{ insertBusinessFocus: number }>(mutation, {
    description,
  });
  return data.insertBusinessFocus;
}
