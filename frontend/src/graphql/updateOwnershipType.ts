import { gqlRequest } from './graphqlClient';

export async function updateOwnershipType(
  id: number,
  description: string
): Promise<number> {
  const mutation = `
    mutation($id: Int!, $description: String!) {
      updateOwnershipType(id: $id, description: $description)
    }
  `;
  const data = await gqlRequest<{ updateOwnershipType: number }>(mutation, {
    id,
    description,
  });
  return data.updateOwnershipType;
}
