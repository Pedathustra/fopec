import { gqlRequest } from './graphqlClient';

export type ChangeVoteParams = {
  crowdsourcedResearchId: number;
  personId: number;
  voteType: 'up' | 'down';
};

export async function changeVote(params: ChangeVoteParams): Promise<number> {
  const mutation = `
    mutation($crowdsourcedResearchId: Int!, $personId: Int!, $voteType: String!) {
      changeVote(crowdsourcedResearchId: $crowdsourcedResearchId, personId: $personId, voteType: $voteType)
    }
  `;

  const data = await gqlRequest<{ changeVote: number }>(mutation, params);
  return data.changeVote;
}
