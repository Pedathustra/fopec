import { gqlRequest } from './graphqlClient';

type Params = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

export async function createAddress(params: Params): Promise<number> {
  const mutation = `
    mutation(
      $line1: String!
      $line2: String
      $city: String!
      $state: String!
      $zip: String!
    ) {
      insertAddress(
        line1: $line1
        line2: $line2
        city: $city
        state: $state
        zip: $zip
      )
    }`;

  const data = await gqlRequest<{ insertAddress: number }>(mutation, params);
  return data.insertAddress;
}
