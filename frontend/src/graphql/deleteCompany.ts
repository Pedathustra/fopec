import { gqlRequest } from './graphqlClient';

type DeleteCompanyParams = {
  id: number;
};

export async function deleteCompany(
  params: DeleteCompanyParams
): Promise<number> {
  const mutation = `
    mutation($id: Int!) {
      deleteCompany(id: $id)
    }
  `;

  const data = await gqlRequest<{ deleteCompany: number }>(mutation, params);
  return data.deleteCompany;
}
