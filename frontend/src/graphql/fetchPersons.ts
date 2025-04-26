import { gqlRequest } from './graphqlClient';

export type PersonBasic = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export async function fetchPersons(): Promise<PersonBasic[]> {
  const query = `
    query {
      getPersons {
        id
        username
        firstName
        lastName
      }
    }
  `;

  const data = await gqlRequest<{ getPersons: PersonBasic[] }>(query);
  return data.getPersons;
}
