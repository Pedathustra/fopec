import { useCallback, useEffect, useState } from 'react';
import type { Company } from '../../types/types';
import { TableHeader } from '../common/TableHeader';
import { TableCell } from '../common/TableCell';
import { AddButtonRow } from '../common/AddButtonRow';
import { DeleteButton } from '../common/DeleteButton';
import { EditButton } from '../common/EditButton';
import { CompanyEditRow } from './CompanyEditRow';
import { createCompany } from '../../graphql/createCompany';
import { updateCompany } from '../../graphql/updateCompany';
import { deleteCompany } from '../../graphql/deleteCompany';
import { usePersonId } from '../../hooks/usePersonId';
import { formatDate } from '../../utils/formatDate';
import { fetchCompaniesByPersonId } from '../../graphql/fetchCompaniesByPersonId';
import { CompanyDetailsRow } from './CompanyDetailsRow';

const emptyCompany = {
  name: '',
  personIdCreated: -1,
};

export function CompanyManager() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [editItem, setEditItem] = useState<Company | null>(null);
  const [expandedCompanyId, setExpandedCompanyId] = useState<number | null>(
    null
  );

  const [newEntry, setNewEntry] =
    useState<Omit<Company, 'id' | 'created' | 'lastUpdated'>>(emptyCompany);
  const [editableRowData, setEditableRowData] =
    useState<
      Omit<Company, 'id' | 'created' | 'lastUpdated' | 'personIdCreated'>
    >(emptyCompany);

  const personId = usePersonId();
  const refetch = useCallback(async () => {
    const data = personId && (await fetchCompaniesByPersonId(personId));
    if (data) setCompanies(data);
  }, [personId]);

  useEffect(() => {
    refetch().finally(() => setLoading(false));
  }, [refetch]);

  const handleDelete = async (id: number) => {
    const success = await deleteCompany({ id });
    if (success === 0) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert('Delete failed');
    }
  };

  const handleSaveNewEntry = async () => {
    if (!newEntry.name.trim()) {
      alert('Please provide a company name');
      return;
    }
    const success =
      personId &&
      (await createCompany({
        name: newEntry.name,
        personIdCreated: personId,
      }));

    if (success === 0) {
      setAddingRow(false);
      setNewEntry(emptyCompany);
      refetch();
    } else {
      alert('Failed to insert');
    }
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    const success =
      personId &&
      (await updateCompany({
        id: editItem.id,
        name: editableRowData.name,
        personIdCreated: personId,
      }));
    if (success === 0) {
      setEditItem(null);
      refetch();
    } else {
      alert('Failed to update company');
    }
  };
  const displayData = companies.flatMap((item) => {
    if (editItem?.id === item.id) {
      return [
        <CompanyEditRow
          key={`edit-${item.id}`}
          value={editableRowData}
          onChange={(field, val) =>
            setEditableRowData({ ...editableRowData, [field]: val })
          }
          onSave={() => handleUpdate()}
          onCancel={() => setEditItem(null)}
        />,
      ];
    }

    const baseRow = (
      <tr key={`company-${item.id}`}>
        <TableCell>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setExpandedCompanyId(
                expandedCompanyId === item.id ? null : item.id
              )
            }
          >
            {expandedCompanyId === item.id ? '▼' : '▶'}
          </span>{' '}
          <EditButton
            label={item.name}
            onClick={() => {
              setEditItem(item);
              setEditableRowData({ name: item.name });
            }}
          />
        </TableCell>
        <TableCell>{formatDate(item.created)}</TableCell>
        <TableCell>{formatDate(item.lastUpdated)}</TableCell>
        <TableCell>
          <DeleteButton onClick={() => handleDelete(item.id)} />
        </TableCell>
      </tr>
    );

    const expandedRow =
      expandedCompanyId === item.id ? (
        <tr key={`details-${item.id}`}>
          <td colSpan={4}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#2a2a2a', // dark gray
                color: '#eee',
                border: '1px solid #444',
                borderRadius: '4px',
              }}
            >
              <CompanyDetailsRow companyId={item.id} onUpdate={refetch} />
            </div>
          </td>
        </tr>
      ) : null;

    return [baseRow, expandedRow].filter(Boolean);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <>
          <h2>Company Manager</h2>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <TableHeader label="Name" />
                <TableHeader label="Created" />
                <TableHeader label="Last Updated" />
                <TableHeader label="Action" />
              </tr>
            </thead>
            <tbody>
              {displayData}
              {!addingRow && (
                <AddButtonRow onClick={() => setAddingRow(true)} />
              )}
              {addingRow && (
                <CompanyEditRow
                  value={newEntry}
                  onChange={(field, val) =>
                    setNewEntry({ ...newEntry, [field]: val })
                  }
                  onSave={() => handleSaveNewEntry()}
                  onCancel={() => setAddingRow(false)}
                />
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
