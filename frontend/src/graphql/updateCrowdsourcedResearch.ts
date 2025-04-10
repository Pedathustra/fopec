import { gqlRequest } from './graphqlClient'

export async function updateCrowdsourcedResearch(input: {
  id: number
  ownershipTypeId: number
  notes: string,
  parentCompanyId: number | null
}): Promise<boolean> {
  const mutation = `
    mutation (
      $id: Int!,
      $ownershipTypeId: Int!,
      $notes: String!
      $parentCompanyId: Int
    ) {
      updateCrowdsourcedResearch(
        id: $id,
        ownershipTypeId: $ownershipTypeId,
        notes: $notes,
        parentCompanyId: $parentCompanyId
      )
    }
  `

  const data = await gqlRequest<{ updateCrowdsourcedResearch: boolean }>(mutation, input)
  return data.updateCrowdsourcedResearch
}
