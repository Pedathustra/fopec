import { gqlRequest } from './graphqlClient';

export type DeleteCompanyAddressParams = {
  companyId: number;
  addressId: number;
};

export async function deleteCompanyAddress(
  params: DeleteCompanyAddressParams
): Promise<number> {
  const mutation = `
    mutation($companyId: Int!, $addressId: Int!) {
      deleteCompanyAddress(companyId: $companyId, addressId: $addressId)
    }
  `;

  const data = await gqlRequest<{ deleteCompanyAddress: number }>(
    mutation,
    params
  );
  return data.deleteCompanyAddress;
}
