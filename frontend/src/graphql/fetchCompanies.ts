import { Company } from '../types/types'
import {gqlRequest} from './graphqlClient'


export async function fetchCompanies(): Promise<Company[]> {
    const query = `
        query {
            getCompanies {
                id
                name
                created
                last_updated
            }
        }`

        const data = await gqlRequest<{getCompanies: Company[]}> (query)
        return data.getCompanies
    }

