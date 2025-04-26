import { useState, useEffect } from 'react';
import { PersonsSelect } from '../common/PersonsSelect';
import {
  fetchPersonAuditById,
  PersonAuditRecord,
} from '../../graphql/fetchPersonAuditById';
import { formatDate } from '../../utils/formatDate';

export function PersonActivity() {
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [auditRecords, setAuditRecords] = useState<PersonAuditRecord[]>([]);

  useEffect(() => {
    if (selectedPersonId) {
      fetchPersonAuditById(selectedPersonId).then(setAuditRecords);
    }
  }, [selectedPersonId]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Account Audit Trail</h2>
      <PersonsSelect value={selectedPersonId} onChange={setSelectedPersonId} />

      {auditRecords.length > 0 && (
        <table
          style={{
            width: '100%',
            marginTop: '1rem',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Middle Name</th>
              <th>Active</th>
              <th>Created Date</th>
              <th>Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {auditRecords.map((record, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#2a2a2a' : '#1f1f1f',
                  fontWeight: record.idx === 1 ? 'bold' : 'normal',
                }}
              >
                <td style={{ textAlign: 'center' }}>{record.idx}</td>
                <td>{record.username}</td>
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.middleName || '—'}</td>
                <td style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: record.isActive ? '#4caf50' : '#f44336',
                      color: 'white',
                      fontSize: '0.85rem',
                    }}
                  >
                    {record.isActive ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  {record.createdDate ? (
                    formatDate(record.createdDate)
                  ) : (
                    <span style={{ color: '#888' }}>—</span>
                  )}
                </td>
                <td>
                  {record.updatedDate ? (
                    formatDate(record.updatedDate)
                  ) : (
                    <span style={{ color: '#888' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
