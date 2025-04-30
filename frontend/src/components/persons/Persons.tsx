import { useCallback, useEffect, useState } from 'react';
import type { PersonActivity } from '../../types/types';
import { TableHeader } from '../common/TableHeader';
import { TableCell } from '../common/TableCell';
import { DeleteButton } from '../common/DeleteButton';
import { fetchPersonActivity } from '../../graphql/fetchPersonActivity';
import { deletePerson } from '../../graphql/deletePerson';
import { updatePersonActive } from '../../graphql/updatePersonActive';

const displayOptions = [
  { label: 'Last, First M.', value: 1 },
  { label: 'First Middle Last', value: 2 },
  { label: 'Username (Last, First M.)', value: 3 },
  { label: 'Username (First Middle L.)', value: 4 },
];

export function Persons() {
  const [persons, setPersons] = useState<PersonActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameFormat, setNameFormat] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const refetch = useCallback(async () => {
    const data = await fetchPersonActivity(nameFormat);
    setPersons(data);
  }, [nameFormat]);

  useEffect(() => {
    refetch().finally(() => setLoading(false));
  }, [nameFormat, refetch]);

  const handleToggleActive = async (id: number, current: boolean) => {
    const result = await updatePersonActive(id, !current);
    if (result === 0) refetch();
    else alert('Failed to update isActive');
  };

  const handleDelete = async (id: number) => {
    const result = await deletePerson(id);
    if (result === 0) refetch();
    else alert('Delete failed');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <h2>Person Activity</h2>
      <label style={{ marginBottom: '1rem' }}>
        Name format:
        <select
          value={nameFormat}
          onChange={(e) => setNameFormat(Number(e.target.value))}
          style={{ marginLeft: '0.5rem' }}
        >
          {displayOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <TableHeader label="Name" />
              <TableHeader label="Active" />
              <TableHeader label="Audits" />
              <TableHeader label="Companies" />
              <TableHeader label="Research" />
              <TableHeader label="Votes" />
              <TableHeader label="Delete" />
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <TableCell>{person.displayName}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={person.isActive}
                    onChange={() =>
                      handleToggleActive(person.id, person.isActive)
                    }
                  />
                </TableCell>
                <TableCell>{person.auditRecords}</TableCell>
                <TableCell>{person.companyRecords}</TableCell>
                <TableCell>{person.crowdsourcedResearchRecords}</TableCell>
                <TableCell>{person.voteRecords}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => setConfirmDeleteId(person.id)} />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {confirmDeleteId !== null && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'grey',
            padding: '1rem',
            border: '1px solid #ccc',
            zIndex: 1000,
          }}
        >
          <p>Are you sure you want to delete this person?</p>
          <button
            onClick={() => {
              handleDelete(confirmDeleteId);
              setConfirmDeleteId(null);
            }}
          >
            Yes, delete
          </button>
          <button onClick={() => setConfirmDeleteId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
