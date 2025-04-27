import { gqlRequest } from './graphqlClient';

export async function deleteOwnershipType(id: number): Promise<number> {
  const mutation = `
    mutation($id: Int!) {
      deleteOwnershipType(id: $id)
    }
  `;
  const data = await gqlRequest<{ deleteOwnershipType: number }>(mutation, {
    id,
  });
  return data.deleteOwnershipType;
}
