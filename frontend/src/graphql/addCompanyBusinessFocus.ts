import { gqlRequest } from './graphqlClient';

export type AddCompanyBusinessFocusParams = {
  companyId: number;
  businessFocusId: number;
};

export async function addCompanyBusinessFocus(
  params: AddCompanyBusinessFocusParams
): Promise<number> {
  const mutation = `
    mutation($companyId: Int!, $businessFocusId: Int!) {
      addCompanyBusinessFocus(companyId: $companyId, businessFocusId: $businessFocusId)
    }
  `;

  const data = await gqlRequest<{ addCompanyBusinessFocus: number }>(
    mutation,
    params
  );
  return data.addCompanyBusinessFocus;
}
