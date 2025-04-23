import { gqlRequest } from './graphqlClient';

export async function createCrowdsourcedResearch(input: {
  companyId: number;
  ownershipTypeId: number;
  observingPersonId: number;
  notes: string;
  parentCompanyId: number | null;
}): Promise<boolean> {
  const mutation = `
    mutation(
      $companyId: Int!,
      $ownershipTypeId: Int!,
      $observingPersonId: Int!,
      $notes: String!
      $parentCompanyId: Int,
    ) {
      createCrowdsourcedResearch(
        companyId: $companyId,
        ownershipTypeId: $ownershipTypeId,
        observingPersonId: $observingPersonId,
        notes: $notes,
        parentCompanyId: $parentCompanyId,
      )
    }
  `;

  const data = await gqlRequest<{ createCrowdsourcedResearch: boolean }>(
    mutation,
    input
  );
  return data.createCrowdsourcedResearch;
}
