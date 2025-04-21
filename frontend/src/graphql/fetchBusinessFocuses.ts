import { gqlRequest } from './graphqlClient';
import { BusinessFocus } from '../types/types';

export async function fetchBusinessFocuses(): Promise<BusinessFocus[]> {
  const query = `
    query {
      getBusinessFocuses {
        id
        description
      }
    }
  `;

  const data = await gqlRequest<{
    getBusinessFocuses: BusinessFocus[];
  }>(query);
  return data.getBusinessFocuses;
}
