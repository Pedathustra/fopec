import { gqlRequest } from './graphqlClient';

export async function deleteBusinessFocus(id: number): Promise<number> {
  const mutation = `
    mutation($id: Int!) {
      deleteBusinessFocus(id: $id)
    }
  `;
  const data = await gqlRequest<{ deleteBusinessFocus: number }>(mutation, {
    id,
  });
  return data.deleteBusinessFocus;
}
