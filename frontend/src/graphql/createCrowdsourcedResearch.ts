import { gqlRequest } from './graphqlClient'

export async function createCrowdsourcedResearch(input: {
  companyId: number
  ownershipTypeId: number
  observingPersonId: number
  notes: string
}): Promise<boolean> {
  const mutation = `
    mutation(
      $companyId: Int!,
      $ownershipTypeId: Int!,
      $observingPersonId: Int!,
      $notes: String!
    ) {
      createCrowdsourcedResearch(
        companyId: $companyId,
        ownershipTypeId: $ownershipTypeId,
        observingPersonId: $observingPersonId,
        notes: $notes
      )
    }
  `

  const data = await gqlRequest<{ createCrowdsourcedResearch: boolean }>(mutation, input)
  return data.createCrowdsourcedResearch
}
