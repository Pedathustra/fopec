import { gqlRequest } from './graphqlClient';

export async function deleteAddress(id: number): Promise<number> {
  const mutation = `
    mutation($id: Int!) {
      deleteAddress(id: $id)
    }`;

  const data = await gqlRequest<{ deleteAddress: number }>(mutation, { id });
  return data.deleteAddress;
}
