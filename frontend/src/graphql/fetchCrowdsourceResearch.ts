import { ResearchItem } from '../types/types'
import { gqlRequest } from './graphqlClient'
 
export async function fetchCrowdsourcedResearch(): Promise<ResearchItem[]> {
  const query = `
    query {
      getCrowdsourcedResearch {
        crowdsourced_id
        name
        description
        username
        created
        notes
      }
    }
  `
  const data = await gqlRequest<{ getCrowdsourcedResearch: ResearchItem[] }>(query)
  return data.getCrowdsourcedResearch
}
