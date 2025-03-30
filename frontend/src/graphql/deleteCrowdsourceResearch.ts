import { gqlRequest } from './graphqlClient'

export async function deleteCrowdsourcedResearch(id: number): Promise<boolean> {
  const mutation = `
    mutation($id: Int!) {
      deleteCrowdsourcedResearch(id: $id)
    }
  `
  const data = await gqlRequest<{ deleteCrowdsourcedResearch: boolean }>(mutation, { id })
  return data.deleteCrowdsourcedResearch
}
