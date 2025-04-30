import { gqlRequest } from './graphqlClient';
export async function updatePersonActive(
  id: number,
  isActive: boolean
): Promise<number> {
  const mutation = `
      mutation($id: Int!, $isActive: Boolean!) {
        updatePersonActive(id: $id, isActive: $isActive)
      }
    `;
  const data = await gqlRequest<{ updatePersonActive: number }>(mutation, {
    id,
    isActive,
  });
  return data.updatePersonActive;
}
