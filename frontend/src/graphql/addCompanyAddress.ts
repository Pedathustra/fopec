import { gqlRequest } from './graphqlClient';

export type AddCompanyAddressParams = {
  companyId: number;
  addressId: number;
  isHQ: boolean;
};

export async function addCompanyAddress(
  params: AddCompanyAddressParams
): Promise<number> {
  const mutation = `
    mutation($companyId: Int!, $addressId: Int!, $isHQ: Boolean!) {
      addCompanyAddress(companyId: $companyId, addressId: $addressId, isHQ: $isHQ)
    }
  `;

  const data = await gqlRequest<{ addCompanyAddress: number }>(
    mutation,
    params
  );
  return data.addCompanyAddress;
}
