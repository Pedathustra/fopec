import { gqlRequest } from './graphqlClient';
import { Company } from '../types/types';

export async function fetchCompaniesByPersonId(
  personId: number
): Promise<Company[]> {
  const query = `
    query($personId: Int!) {
      getCompaniesByPersonCreatedID(personId: $personId) {
        id
        name
        created
        lastUpdated
        personIdCreated
      }
    }
  `;

  const data = await gqlRequest<{ getCompaniesByPersonCreatedID: Company[] }>(
    query,
    { personId }
  );
  return data.getCompaniesByPersonCreatedID;
}
