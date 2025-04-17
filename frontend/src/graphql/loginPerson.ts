import { gqlRequest } from './graphqlClient'

export async function loginPerson(username: string, password: string): Promise<{
  success: boolean
  token?: string
  error?: string
}> {
  const mutation = `
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        success
        token
        error
      }
    }
  `

  const response = await gqlRequest<{
    login: { success: boolean; token?: string; error?: string }
  }>(mutation, { username, password })

  return response.login
}
