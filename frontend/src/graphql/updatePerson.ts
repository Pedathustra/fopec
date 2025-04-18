import { gqlRequest } from './graphqlClient'

export async function updatePerson(input: {
  id: number
  firstName: string
  lastName: string
  middleName?: string
  username: string
  password: string
  isActive?: boolean
}): Promise<{ success: boolean; error?: string }> {
  const mutation = `
    mutation UpdatePerson(
      $id: Int!,
      $firstName: String!,
      $lastName: String!,
      $middleName: String,
      $username: String!,
      $password: String!,
      $isActive: Boolean
    ) {
      updatePerson(
        id: $id,
        firstName: $firstName,
        lastName: $lastName,
        middleName: $middleName,
        username: $username,
        password: $password,
        isActive: $isActive
      ) {
        success
        error
      }
    }
  `

  const data = await gqlRequest<{
    updatePerson: { success: boolean; error?: string }
  }>(mutation, input)

  return data.updatePerson
}
