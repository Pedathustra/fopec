import { DatabaseObjectCounts } from '../types/types';
import { gqlRequest } from './graphqlClient';

export async function fetchDatabaseObjectCounts() {
  const query = `
    query {
      getDatabaseObjectCounts {
        tableCount
        viewCount
        procedureCount
        functionCount
        triggerCount
      }
    }
  `;
  const data = await gqlRequest<{
    getDatabaseObjectCounts: DatabaseObjectCounts;
  }>(query);
  return data.getDatabaseObjectCounts;
}
