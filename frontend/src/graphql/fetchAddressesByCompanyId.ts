import { gqlRequest } from './graphqlClient';
import { Address } from '../types/types';

export async function fetchAddressesByCompanyId(
  companyId: number
): Promise<Address[]> {
  const query = `
    query($companyId: Int!) {
      getAddressesByCompanyId(companyId: $companyId) {
        id
        line1
        line2
        city
        state
        zip
        isHQ
      }
    }
  `;

  const data = await gqlRequest<{ getAddressesByCompanyId: Address[] }>(query, {
    companyId,
  });
  return data.getAddressesByCompanyId;
}
