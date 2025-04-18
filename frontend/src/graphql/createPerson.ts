import { CreatePerson, Person } from '../types/types'
import { gqlRequest } from './graphqlClient'


export async function createPerson(input: CreatePerson): Promise<boolean> {
  const mutation = `
    mutation CreatePerson(
      $firstName: String!
      $lastName: String!
      $middleName: String
      $username: String!
      $password: String!
    ) {
      createPerson(
        firstName: $firstName
        lastName: $lastName
        middleName: $middleName
        username: $username
        password: $password
      ) {
        success
        error
      }
    }
  `

  const data = await gqlRequest<{
    createPerson: { success: boolean; error?: string }
  }>(mutation, input)

  return data.createPerson.success
}
