import { PersonActivity } from '../types/types';
import { gqlRequest } from './graphqlClient';

export async function fetchPersonActivity(nameDisplayType: number) {
  const query = `
    query($nameDisplayType: Int!) {
      getPersonActivity(nameDisplayType: $nameDisplayType) {
        id
        displayName
        isActive
        auditRecords
        companyRecords
        crowdsourcedResearchRecords
        voteRecords
      }
    }
  `;
  const data = await gqlRequest<{ getPersonActivity: PersonActivity[] }>(
    query,
    {
      nameDisplayType,
    }
  );
  return data.getPersonActivity;
}
