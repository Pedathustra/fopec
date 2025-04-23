import { gqlRequest } from './graphqlClient';
import type { ResearchItem } from '../types/types';

export async function fetchCrowdsourcedResearchByPersonId(
  personId: number
): Promise<ResearchItem[]> {
  const query = `
    query($personId: Int!) {
      getCrowdsourcedResearchByPersonId(personId: $personId) {
        crowdsourcedId
        companyId
        companyName
        parentCompanyId
        parentCompanyName
        ownershipTypeId
        ownershipTypeDescription
        username
        created
        notes
      }
    }
  `;

  const data = await gqlRequest<{
    getCrowdsourcedResearchByPersonId: ResearchItem[];
  }>(query, { personId });
  return data.getCrowdsourcedResearchByPersonId;
}
