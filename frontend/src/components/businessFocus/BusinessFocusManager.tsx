import { useEffect, useState } from 'react';
import { TableHeader } from '../common/TableHeader';
import { TableCell } from '../common/TableCell';
import { AddButtonRow } from '../common/AddButtonRow';
import { DeleteButton } from '../common/DeleteButton';
import { EditButton } from '../common/EditButton';
import { AddButton } from '../common/AddButton';
import { CancelButton } from '../common/CancelButton';

import { fetchBusinessFocuses } from '../../graphql/fetchBusinessFocuses';
import { createBusinessFocus } from '../../graphql/createBusinessFocus';
import { updateBusinessFocus } from '../../graphql/updateBusinessFocus';
import { deleteBusinessFocus } from '../../graphql/deleteBusinessFocus';

export function BusinessFocusManager() {
  const [focuses, setFocuses] = useState<{ id: number; description: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [editableDescription, setEditableDescription] = useState('');

  const refetch = async () => {
    const data = await fetchBusinessFocuses();
    setFocuses(data);
  };

  useEffect(() => {
    refetch().finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const success = await deleteBusinessFocus(id);
    if (success === 0) {
      setFocuses((prev) => prev.filter((f) => f.id !== id));
    } else {
      alert('Delete failed (might be in use).');
    }
  };

  const handleSaveNew = async () => {
    if (!newDescription.trim()) {
      alert('Description required');
      return;
    }
    const success = await createBusinessFocus(newDescription);
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
    const success = await updateBusinessFocus(editItemId, editableDescription);
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
        <p>Loading Business Focuses...</p>
      ) : (
        <>
          <h2>Business Focus Manager</h2>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <TableHeader label="Description" />
                <TableHeader label="Action" />
              </tr>
            </thead>
            <tbody>
              {focuses.map((focus) =>
                editItemId === focus.id ? (
                  <tr key={focus.id}>
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
                  <tr key={focus.id}>
                    <TableCell>
                      <EditButton
                        label={focus.description}
                        onClick={() => {
                          setEditItemId(focus.id);
                          setEditableDescription(focus.description);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteButton onClick={() => handleDelete(focus.id)} />
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
                      placeholder="New Business Focus"
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
