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
        last_updated
        person_id_created
      }
    }
  `;

  const data = await gqlRequest<{ getCompaniesByPersonCreatedID: Company[] }>(
    query,
    { personId }
  );
  return data.getCompaniesByPersonCreatedID;
}
