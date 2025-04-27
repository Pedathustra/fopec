import { gqlRequest } from './graphqlClient';

export async function createOwnershipType(
  description: string
): Promise<number> {
  const mutation = `
    mutation($description: String!) {
      insertOwnershipType(description: $description)
    }
  `;
  const data = await gqlRequest<{ insertOwnershipType: number }>(mutation, {
    description,
  });
  return data.insertOwnershipType;
}
