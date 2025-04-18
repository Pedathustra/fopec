import { OwnershipType } from '../types/types'
import {gqlRequest} from './graphqlClient'


export async function fetchOwnershipTypes(): Promise<OwnershipType[]> {
    const query = `
        query {
            getOwnershipTypes {
                id
                description
            }
        }`

        const data = await gqlRequest<{getOwnershipTypes: OwnershipType[]}> (query)
        return data.getOwnershipTypes
    }

