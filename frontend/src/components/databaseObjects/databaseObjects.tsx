import { useEffect, useState } from 'react';
import type { DatabaseObjectCounts } from '../../types/types';
import { fetchDatabaseObjectCounts } from '../../graphql/fetchDatabaseObjectCounts';
import { TableCell } from '../common/TableCell';
import { TableHeader } from '../common/TableHeader';

export function DatabaseObjects() {
  const [data, setData] = useState<DatabaseObjectCounts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatabaseObjectCounts()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Database Object Summary</h2>
      {loading ? (
        <p>Loading object counts...</p>
      ) : data ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem',
          }}
        >
          <thead>
            <tr>
              <TableHeader label="Tables" />
              <TableHeader label="Views" />
              <TableHeader label="Stored Procs" />
              <TableHeader label="Functions" />
              <TableHeader label="Triggers" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>{data.tableCount}</TableCell>
              <TableCell>{data.viewCount}</TableCell>
              <TableCell>{data.procedureCount}</TableCell>
              <TableCell>{data.functionCount}</TableCell>
              <TableCell>{data.triggerCount}</TableCell>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Unable to load data.</p>
      )}
    </div>
  );
}
