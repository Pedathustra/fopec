import { useEffect, useState } from 'react';
import { TableHeader } from '../common/TableHeader';
import { TableCell } from '../common/TableCell';
import { AddButtonRow } from '../common/AddButtonRow';
import { DeleteButton } from '../common/DeleteButton';
import { EditButton } from '../common/EditButton';
import { AddButton } from '../common/AddButton';
import { CancelButton } from '../common/CancelButton';

import { fetchOwnershipTypes } from '../../graphql/fetchOwnershipTypes';
import { createOwnershipType } from '../../graphql/createOwnershipType';
import { updateOwnershipType } from '../../graphql/updateOwnershipType';
import { deleteOwnershipType } from '../../graphql/deleteOwnershipType';

export function OwnershipTypeManager() {
  const [types, setTypes] = useState<{ id: number; description: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [editableDescription, setEditableDescription] = useState('');

  const refetch = async () => {
    const data = await fetchOwnershipTypes();
    setTypes(data);
  };

  useEffect(() => {
    refetch().finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const success = await deleteOwnershipType(id);
    if (success === 0) {
      setTypes((prev) => prev.filter((t) => t.id !== id));
    } else {
      alert('Delete failed (type may be in use)');
    }
  };

  const handleSaveNew = async () => {
    if (!newDescription.trim()) {
      alert('Description required');
      return;
    }
    const success = await createOwnershipType(newDescription);
    if (success === 0) {
      setAddingRow(false);
      setNewDescription('');
      refetch();
    } else {
      alert('Insert failed (duplicate?)');
    }
  };

  const handleUpdate = async () => {
    if (editItemId == null) return;
    if (!editableDescription.trim()) {
      alert('Description required');
      return;
    }
    const success = await updateOwnershipType(editItemId, editableDescription);
    if (success === 0) {
      setEditItemId(null);
      refetch();
    } else {
      alert('Update failed (duplicate?)');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {loading ? (
        <p>Loading Ownership Types...</p>
      ) : (
        <>
          <h2>Ownership Type Manager</h2>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <TableHeader label="Description" />
                <TableHeader label="Action" />
              </tr>
            </thead>
            <tbody>
              {types.map((type) =>
                editItemId === type.id ? (
                  <tr key={type.id}>
                    <TableCell>
                      <input
                        type="text"
                        value={editableDescription}
                        onChange={(e) => setEditableDescription(e.target.value)}
                      />
                    </TableCell>
                    <TableCell nowrap>
                      <AddButton onClick={handleUpdate} />
                      <CancelButton onClick={() => setEditItemId(null)} />
                    </TableCell>
                  </tr>
                ) : (
                  <tr key={type.id}>
                    <TableCell>
                      <EditButton
                        label={type.description}
                        onClick={() => {
                          setEditItemId(type.id);
                          setEditableDescription(type.description);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteButton onClick={() => handleDelete(type.id)} />
                    </TableCell>
                  </tr>
                )
              )}
              {!addingRow && (
                <AddButtonRow onClick={() => setAddingRow(true)} />
              )}
              {addingRow && (
                <tr>
                  <TableCell>
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="New Ownership Type"
                    />
                  </TableCell>
                  <TableCell nowrap>
                    <AddButton onClick={handleSaveNew} />
                    <CancelButton onClick={() => setAddingRow(false)} />
                  </TableCell>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
