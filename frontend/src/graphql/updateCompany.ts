import { gqlRequest } from './graphqlClient';

type UpdateCompanyParams = {
  id: number;
  name: string;
  person_id: number;
};

export async function updateCompany(
  params: UpdateCompanyParams
): Promise<number> {
  const mutation = `
    mutation($id: Int!, $name: String!, $person_id: Int!) {
      updateCompany(id: $id, name: $name, person_id: $person_id)
    }
  `;

  const data = await gqlRequest<{ updateCompany: number }>(mutation, params);
  return data.updateCompany;
}
