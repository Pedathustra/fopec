import { gqlRequest } from './graphqlClient';

type CreateCompanyParams = {
  name: string;
  person_id_created: number;
};

export async function createCompany(
  params: CreateCompanyParams
): Promise<number> {
  const mutation = `
    mutation($name: String!, $person_id_created: Int!) {
      insertCompany(name: $name, person_id_created: $person_id_created)
    }
  `;

  const data = await gqlRequest<{ insertCompany: number }>(mutation, params);
  return data.insertCompany;
}
