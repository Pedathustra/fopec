import { gqlRequest } from './graphqlClient';

export type UpdateCompanyLocationParams = {
  companyId: number;
  addressId: number;
  isHQ: boolean;
};

export async function updateCompanyLocation(
  params: UpdateCompanyLocationParams
): Promise<number> {
  const mutation = `
    mutation($companyId: Int!, $addressId: Int!, $isHQ: Boolean!) {
      updateCompanyLocation(companyId: $companyId, addressId: $addressId, isHQ: $isHQ)
    }
  `;

  const data = await gqlRequest<{ updateCompanyLocation: number }>(
    mutation,
    params
  );
  console.log('data', data);
  return data.updateCompanyLocation;
}
