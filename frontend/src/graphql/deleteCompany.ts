import { gqlRequest } from './graphqlClient';

type DeleteCompanyParams = {
  id: number;
  person_id: number;
};

export async function deleteCompany(
  params: DeleteCompanyParams
): Promise<number> {
  const mutation = `
    mutation($id: Int!, $person_id: Int!) {
      deleteCompany(id: $id, person_id: $person_id)
    }
  `;

  const data = await gqlRequest<{ deleteCompany: number }>(mutation, params);
  return data.deleteCompany;
}
