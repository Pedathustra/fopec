import { gqlRequest } from './graphqlClient';

export type PersonAuditRecord = {
  firstName: string;
  lastName: string;
  middleName?: string;
  username: string;
  createdDate?: string;
  updatedDate?: string;
  isActive: boolean;
  recordType: string;
  idx: number;
};

export async function fetchPersonAuditById(
  personId: number
): Promise<PersonAuditRecord[]> {
  const query = `
    query($personId: Int!) {
      getPersonAuditById(personId: $personId) {
        firstName
        lastName
        middleName
        username
        createdDate
        updatedDate
        isActive
        recordType
        idx
      }
    }
  `;

  const data = await gqlRequest<{ getPersonAuditById: PersonAuditRecord[] }>(
    query,
    { personId }
  );
  return data.getPersonAuditById;
}
