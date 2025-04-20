import { gqlRequest } from './graphqlClient';

type UpdateCompanyParams = {
  id: number;
  name: string;
  personIdCreated: number;
};

export async function updateCompany(
  params: UpdateCompanyParams
): Promise<number> {
  const mutation = `
    mutation($id: Int!, $name: String!) {
      updateCompany(id: $id, name: $name)
    }
  `;

  const data = await gqlRequest<{ updateCompany: number }>(mutation, params);
  return data.updateCompany;
}
