import { gqlRequest } from './graphqlClient';

export type CastVoteParams = {
  crowdsourcedResearchId: number;
  personId: number;
  voteType: 'up' | 'down';
};

export async function castVote(params: CastVoteParams): Promise<number> {
  const mutation = `
    mutation($crowdsourcedResearchId: Int!, $personId: Int!, $voteType: String!) {
      castVote(crowdsourcedResearchId: $crowdsourcedResearchId, personId: $personId, voteType: $voteType)
    }
  `;

  const data = await gqlRequest<{ castVote: number }>(mutation, params);
  return data.castVote;
}
