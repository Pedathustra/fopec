import { OwnershipTypes } from '../types/types'
import {gqlRequest} from './graphqlClient'


export async function fetchOwnershipTypes(): Promise<OwnershipTypes[]> {
    const query = `
        query {
            getOwnershipTypes {
                id
                description
            }
        }`

        const data = await gqlRequest<{getOwnershipTypes: OwnershipTypes[]}> (query)
        return data.getOwnershipTypes
    }

