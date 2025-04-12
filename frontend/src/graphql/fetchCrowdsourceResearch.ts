import { ResearchItem } from '../types/types'
import { gqlRequest } from './graphqlClient'
 
export async function fetchCrowdsourcedResearch(): Promise<ResearchItem[]> {
  const query = `
    query {
      getCrowdsourcedResearch {
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
  `
  const data = await gqlRequest<{ getCrowdsourcedResearch: ResearchItem[] }>(query)
  return data.getCrowdsourcedResearch
}
