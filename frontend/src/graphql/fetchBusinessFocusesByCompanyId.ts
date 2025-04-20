import { gqlRequest } from './graphqlClient';
import { BusinessFocus } from '../types/types';

export async function fetchBusinessFocusesByCompanyId(
  companyId: number
): Promise<BusinessFocus[]> {
  const query = `
    query($companyId: Int!) {
      getBusinessFocusesByCompanyId(companyId: $companyId) {
        id
        description
      }
    }
  `;

  const data = await gqlRequest<{
    getBusinessFocusesByCompanyId: BusinessFocus[];
  }>(query, { companyId });
  return data.getBusinessFocusesByCompanyId;
}
