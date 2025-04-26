import { gqlRequest } from './graphqlClient';

export type WithdrawVoteParams = {
  crowdsourcedResearchId: number;
  personId: number;
};

export async function withdrawVote(
  params: WithdrawVoteParams
): Promise<number> {
  const mutation = `
    mutation($crowdsourcedResearchId: Int!, $personId: Int!) {
      withdrawVote(crowdsourcedResearchId: $crowdsourcedResearchId, personId: $personId)
    }
  `;

  const data = await gqlRequest<{ withdrawVote: number }>(mutation, params);
  return data.withdrawVote;
}
