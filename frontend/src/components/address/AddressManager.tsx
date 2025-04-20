import { useEffect, useState } from 'react';
import type { Address } from '../../types/types';
import { TableHeader } from '../common/TableHeader';
import { TableCell } from '../common/TableCell';
import { AddButtonRow } from '../common/AddButtonRow';
import { DeleteButton } from '../common/DeleteButton';
import { EditButton } from '../common/EditButton';
import { AddressEditRow } from './AddressEditRow';
import { fetchAddresses } from '../../graphql/fetchAddresses';
import { deleteAddress } from '../../graphql/deleteAddress';
import { createAddress } from '../../graphql/createAddress';
import { updateAddress } from '../../graphql/updateAddress';

export function AddressManager() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [editItem, setEditItem] = useState<Address | null>(null);

  const emptyAddress = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  };

  const [newEntry, setNewEntry] = useState<Omit<Address, 'id'>>(emptyAddress);

  const [editableRowData, setEditableRowData] =
    useState<Omit<Address, 'id'>>(emptyAddress);

  const refetch = async () => {
    const data = await fetchAddresses();
    setAddresses(data);
  };

  useEffect(() => {
    refetch().finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const success = await deleteAddress(id);
    if (success === 0) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert('Delete failed (address might be in use).');
    }
  };

  const handleSaveNewEntry = async () => {
    const { line1, city, state, zip } = newEntry;
    if (!line1.trim() || !city.trim() || !state.trim() || !zip.trim()) {
      alert('Missing required fields');
      return;
    }
    const success = await createAddress(newEntry);
    if (success === 0) {
      setAddingRow(false);
      setNewEntry({ line1: '', line2: '', city: '', state: '', zip: '' });
      refetch();
    } else {
      alert('Failed to insert');
    }
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    const success = await updateAddress({
      id: editItem.id,
      ...editableRowData,
    });
    if (success === 0) {
      setEditItem(null);
      refetch();
    } else {
      alert('Failed to update address');
    }
  };

  const displayData = addresses.map((item, idx) =>
    editItem?.id === item.id ? (
      <AddressEditRow
        key={idx}
        value={editableRowData}
        onChange={(field, val) =>
          setEditableRowData({ ...editableRowData, [field]: val })
        }
        onSave={handleUpdate}
        onCancel={() => setEditItem(null)}
      />
    ) : (
      <tr key={idx}>
        <TableCell>
          <EditButton
            label={item.line1}
            onClick={() => {
              setEditItem(item);
              setEditableRowData({ ...item });
            }}
          />
        </TableCell>
        <TableCell>{item.line2 || '—'}</TableCell>
        <TableCell>{item.city}</TableCell>
        <TableCell>{item.state}</TableCell>
        <TableCell>{item.zip}</TableCell>
        <TableCell>
          <DeleteButton onClick={() => handleDelete(item.id)} />
        </TableCell>
      </tr>
    )
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {loading ? (
        <p>Loading addresses...</p>
      ) : (
        <>
          <h2>Address Book</h2>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <TableHeader label="Line 1" />
                <TableHeader label="Line 2" />
                <TableHeader label="City" />
                <TableHeader label="State" />
                <TableHeader label="ZIP" />
                <TableHeader label="Action" />
              </tr>
            </thead>
            <tbody>
              {displayData}
              {!addingRow && (
                <AddButtonRow onClick={() => setAddingRow(true)} />
              )}
              {addingRow && (
                <AddressEditRow
                  value={newEntry}
                  onChange={(field, val) =>
                    setNewEntry({ ...newEntry, [field]: val })
                  }
                  onSave={handleSaveNewEntry}
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
