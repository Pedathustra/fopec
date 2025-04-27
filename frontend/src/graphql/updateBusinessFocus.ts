import { gqlRequest } from './graphqlClient';

export async function updateBusinessFocus(
  id: number,
  description: string
): Promise<number> {
  const mutation = `
    mutation($id: Int!, $description: String!) {
      updateBusinessFocus(id: $id, description: $description)
    }
  `;
  const data = await gqlRequest<{ updateBusinessFocus: number }>(mutation, {
    id,
    description,
  });
  return data.updateBusinessFocus;
}
