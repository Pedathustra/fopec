import { gqlRequest } from './graphqlClient';

export async function deletePerson(id: number): Promise<number> {
  const mutation = `
      mutation($personId: Int!) {
        deletePerson(personId: $personId)
      }
    `;
  const data = await gqlRequest<{ deletePerson: number }>(mutation, {
    personId: id,
  });
  return data.deletePerson;
}
