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
  hasUserVoted: boolean;
  isObserver: boolean;
};

export async function fetchVotes(personId: number): Promise<VoteSummary[]> {
  const query = `
    query($personId: Int!) {
      getVotes(personId: $personId) {
        companyName
        ownershipTypeDescription
        parentCompanyName
        id
        notes
        observer
        observerId
        upCount
        downCount
        hasUserVoted
        isObserver
      }
    }
  `;

  const data = await gqlRequest<{ getVotes: VoteSummary[] }>(query, {
    personId,
  });
  return data.getVotes;
}
