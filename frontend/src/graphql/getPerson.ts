import { Person } from '../types/types'
import { gqlRequest } from './graphqlClient'


export async function getPerson(id: number): Promise<Person | null> {
  const query = `
    query GetPerson($id: Int!) {
      getPerson(id: $id) {
        id
        firstName
        lastName
        middleName
        username
        isActive
      }
    }
  `

  const data = await gqlRequest<{ getPerson: Person | null }>(query, { id })
  return data.getPerson
}
