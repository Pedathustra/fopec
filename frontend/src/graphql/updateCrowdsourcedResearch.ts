import { gqlRequest } from './graphqlClient'

export async function updateCrowdsourcedResearch(input: {
  id: number
  ownershipTypeId: number
  notes: string
}): Promise<boolean> {
  const mutation = `
    mutation (
      $id: Int!,
      $ownershipTypeId: Int!,
      $notes: String!
    ) {
      updateCrowdsourcedResearch(
        id: $id,
        ownershipTypeId: $ownershipTypeId,
        notes: $notes
      )
    }
  `

  const data = await gqlRequest<{ updateCrowdsourcedResearch: boolean }>(mutation, input)
  return data.updateCrowdsourcedResearch
}
