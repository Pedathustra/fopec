import { gqlRequest } from './graphqlClient';

export type UpdateAddressParams = {
  id: number;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

export async function updateAddress(
  params: UpdateAddressParams
): Promise<number> {
  const mutation = `
    mutation(
      $id: Int!
      $line1: String!
      $line2: String
      $city: String!
      $state: String!
      $zip: String!
    ) {
      updateAddress(
        id: $id
        line1: $line1
        line2: $line2
        city: $city
        state: $state
        zip: $zip
      )
    }`;

  const data = await gqlRequest<{ updateAddress: number }>(mutation, params);
  return data.updateAddress;
}
