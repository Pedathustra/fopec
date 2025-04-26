import { gqlRequest } from './graphqlClient';

export type VoteSummary = {
  companyName: string;
  ownershipTypeDescription: string;
  parentCompanyName?: string;
  id: number;
  notes?: string;
  observer: string;
  observerId: number;
  upCount: number;
  downCount: number;
};

export async function fetchVotes(
  observerPersonId: number
): Promise<VoteSummary[]> {
  const query = `
    query($observerPersonId: Int!) {
      getVotes(observerPersonId: $observerPersonId) {
        companyName
        ownershipTypeDescription
        parentCompanyName
        id
        notes
        observer
        observerId
        upCount
        downCount
      }
    }
  `;

  const data = await gqlRequest<{ getVotes: VoteSummary[] }>(query, {
    observerPersonId,
  });
  return data.getVotes;
}
