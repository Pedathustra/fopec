import { gqlRequest } from './graphqlClient';

type CreateCompanyParams = {
  name: string;
  personIdCreated: number;
};

export async function createCompany(
  params: CreateCompanyParams
): Promise<number> {
  const mutation = `
    mutation($name: String!, $personIdCreated: Int!) {
      insertCompany(name: $name, personIdCreated: $personIdCreated)
    }
  `;

  const data = await gqlRequest<{ insertCompany: number }>(mutation, params);
  return data.insertCompany;
}
