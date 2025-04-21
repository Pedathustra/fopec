import { gqlRequest } from './graphqlClient';
import { Company } from '../types/types';

export async function fetchCompaniesByPersonId(
  personId: number
): Promise<Company[]> {
  const query = `
    query($personId: Int!) {
      getCompaniesByPersonId(personId: $personId) {
        id
        name
        created
        lastUpdated
        personIdCreated
      }
    }
  `;

  const data = await gqlRequest<{ getCompaniesByPersonId: Company[] }>(query, {
    personId,
  });
  return data.getCompaniesByPersonId;
}
