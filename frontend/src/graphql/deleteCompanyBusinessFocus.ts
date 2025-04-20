import { gqlRequest } from './graphqlClient';

export type DeleteCompanyBusinessFocusParams = {
  companyId: number;
  businessFocusId: number;
};

export async function deleteCompanyBusinessFocus(
  params: DeleteCompanyBusinessFocusParams
): Promise<number> {
  const mutation = `
    mutation($companyId: Int!, $businessFocusId: Int!) {
      deleteCompanyBusinessFocus(companyId: $companyId, businessFocusId: $businessFocusId)
    }
  `;

  const data = await gqlRequest<{ deleteCompanyBusinessFocus: number }>(
    mutation,
    params
  );
  return data.deleteCompanyBusinessFocus;
}
