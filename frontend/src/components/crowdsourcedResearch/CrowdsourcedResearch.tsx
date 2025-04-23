import { useEffect, useState } from 'react';
import { AddButtonRow } from '../common/AddButtonRow';
import { DeleteButton } from '../common/DeleteButton';
import { TableHeader } from '../common/TableHeader';
import { TableCell } from '../common/TableCell';
import { EditButton } from '../common/EditButton';
import ResearchEditRow from './EditResearchRow';
import { formatDate } from '../../utils/formatDate';
import type { Company, OwnershipType, ResearchItem } from '../../types/types';
import { fetchCrowdsourcedResearchByPersonId } from '../../graphql/fetchCrowdsourcedResearchByPersonId';
import { deleteCrowdsourcedResearch } from '../../graphql/deleteCrowdsourceResearch';
import { createCrowdsourcedResearch } from '../../graphql/createCrowdsourcedResearch';
import { fetchCompanies } from '../../graphql/fetchCompanies';
import { fetchOwnershipTypes } from '../../graphql/fetchOwnershipTypes';
import { updateCrowdsourcedResearch } from '../../graphql/updateCrowdsourcedResearch';
import { usePersonId } from '../../hooks/usePersonId';

export function CrowdsourcedResearch() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [editItem, setEditItem] = useState<ResearchItem | null>(null);

  const [newEntry, setNewEntry] = useState({
    companyId: '',
    ownershipTypeId: '',
    notes: '',
    parentCompanyId: '',
  });

  const [editableRowData, setEditableRowData] = useState({
    companyId: '',
    ownershipTypeId: '',
    notes: '',
    parentCompanyId: '',
  });
  const personId = usePersonId();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [ownershipTypes, setOwnershipTypes] = useState<OwnershipType[]>([]);

  const refetch = async () => {
    if (personId) {
      const data = await fetchCrowdsourcedResearchByPersonId(personId);
      setItems(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (personId) {
          const data = await fetchCrowdsourcedResearchByPersonId(personId);
          setItems(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const load = async () => {
      const [c, o] = await Promise.all([
        fetchCompanies(),
        fetchOwnershipTypes(),
      ]);
      setCompanies(c);
      setOwnershipTypes(o);
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const success = await deleteCrowdsourcedResearch(id);
      if (success) {
        setItems((prev) => prev.filter((item) => item.crowdsourcedId !== id));
      } else {
        alert('Delete failed.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Something went wrong while deleting.');
    }
  };

  const handleSaveNewEntry = async () => {
    const { companyId, ownershipTypeId, notes, parentCompanyId } = newEntry;
    if (!companyId || !ownershipTypeId || !notes.trim()) {
      alert('Please fill out all fields');
      return;
    }

    const success =
      personId &&
      (await createCrowdsourcedResearch({
        companyId: Number(companyId),
        ownershipTypeId: Number(ownershipTypeId),
        observingPersonId: personId,
        notes,
        parentCompanyId: parentCompanyId ? Number(parentCompanyId) : null,
      }));

    if (success) {
      setNewEntry({
        companyId: '',
        ownershipTypeId: '',
        notes: '',
        parentCompanyId: '',
      });
      setAddingRow(false);
      refetch();
    } else {
      alert('Failed to save entry.');
    }
  };

  const handleUpdate = async () => {
    if (!editItem) return;

    const success = await updateCrowdsourcedResearch({
      id: editItem.crowdsourcedId,
      ownershipTypeId: Number(editableRowData.ownershipTypeId),
      notes: editableRowData.notes,
      parentCompanyId: editableRowData.parentCompanyId
        ? Number(editableRowData.parentCompanyId)
        : null,
    });

    if (success) {
      setEditItem(null);
      await refetch();
    } else {
      alert('Update failed');
    }
  };

  const handleAddNew = () => {
    setAddingRow(true);
  };

  const readOnlyRow = (item: ResearchItem, idx: number) => (
    <tr key={idx}>
      <TableCell nowrap>
        <EditButton
          label={item.companyName}
          onClick={() => {
            setEditItem(item);
            setEditableRowData({
              companyId: String(item.companyId),
              ownershipTypeId: String(item.ownershipTypeId),
              notes: item.notes || '',
              parentCompanyId: item.parentCompanyId
                ? String(item.parentCompanyId)
                : '',
            });
          }}
        />
      </TableCell>
      <TableCell nowrap>{item.ownershipTypeDescription}</TableCell>
      <TableCell nowrap>{formatDate(item.created)}</TableCell>
      <TableCell>{item.notes}</TableCell>
      <TableCell>
        {item.parentCompanyId ? item.parentCompanyName : '—'}
      </TableCell>
      <TableCell>
        <DeleteButton onClick={() => handleDelete(item.crowdsourcedId)} />
      </TableCell>
    </tr>
  );

  const displayData = items.map((item, idx) =>
    editItem?.crowdsourcedId === item.crowdsourcedId ? (
      <ResearchEditRow
        key={idx}
        value={editableRowData}
        onChange={(field, val) =>
          setEditableRowData({ ...editableRowData, [field]: val })
        }
        onSave={handleUpdate}
        companies={companies}
        ownershipTypes={ownershipTypes}
        onCancel={() => setEditItem(null)}
      />
    ) : (
      readOnlyRow(item, idx)
    )
  );

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h2>See the Hands Holding the Strings</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <TableHeader label="Name" nowrap />
                <TableHeader label="Type" />
                <TableHeader label="Created" />
                <TableHeader label="Notes" />
                <TableHeader label="Parent Company" />
                <TableHeader label="Action" />
              </tr>
            </thead>
            <tbody>
              {displayData}
              {!addingRow && <AddButtonRow onClick={handleAddNew} />}
              {addingRow && (
                <ResearchEditRow
                  value={newEntry}
                  onChange={(field, val) =>
                    setNewEntry({ ...newEntry, [field]: val })
                  }
                  onSave={handleSaveNewEntry}
                  companies={companies}
                  ownershipTypes={ownershipTypes}
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
