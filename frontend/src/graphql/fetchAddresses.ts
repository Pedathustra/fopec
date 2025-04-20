import { gqlRequest } from './graphqlClient';
import type { Address } from '../types/types';

export async function fetchAddresses(): Promise<Address[]> {
  const query = `
    query {
      getAddresses {
        id
        line1
        line2
        city
        state
        zip
      }
    }`;

  const data = await gqlRequest<{ getAddresses: Address[] }>(query);
  return data.getAddresses;
}
