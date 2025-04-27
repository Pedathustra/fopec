import { useCallback, useEffect, useState } from 'react';
import { fetchAddressesByCompanyId } from '../../graphql/fetchAddressesByCompanyId';
import { fetchBusinessFocusesByCompanyId } from '../../graphql/fetchBusinessFocusesByCompanyId';
import { deleteCompanyAddress } from '../../graphql/deleteCompanyAddress';
import { deleteCompanyBusinessFocus } from '../../graphql/deleteCompanyBusinessFocus';
import { Address, BusinessFocus } from '../../types/types';
import { DeleteButton } from '../common/DeleteButton';
import { fetchAddresses } from '../../graphql/fetchAddresses';
import { fetchBusinessFocuses } from '../../graphql/fetchBusinessFocuses';
import { addCompanyAddress } from '../../graphql/addCompanyAddress';
import { addCompanyBusinessFocus } from '../../graphql/addCompanyBusinessFocus';
import { updateCompanyLocation } from '../../graphql/updateCompanyLocation';
import { CancelButton } from '../common/CancelButton';
import { AddButton } from '../common/AddButton';

type Props = {
  companyId: number;
  onUpdate?: () => void;
};

export function CompanyDetailsRow({ companyId, onUpdate }: Props) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [focuses, setFocuses] = useState<BusinessFocus[]>([]);
  const [loading, setLoading] = useState(true);

  const [allAddresses, setAllAddresses] = useState<Address[]>([]);
  const [allFocuses, setAllFocuses] = useState<BusinessFocus[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [selectedFocusId, setSelectedFocusId] = useState<number | null>(null);
  const [editAddressId, setEditAddressId] = useState<number | null>(null);
  const [editableAddress, setEditableAddress] = useState<Omit<Address, 'id'>>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    isHQ: false,
  });

  const loadData = useCallback(async () => {
    const [a, f, allA, allF] = await Promise.all([
      fetchAddressesByCompanyId(companyId),
      fetchBusinessFocusesByCompanyId(companyId),
      fetchAddresses(),
      fetchBusinessFocuses(),
    ]);
    setAddresses(a);
    setFocuses(f);
    setAllAddresses(allA);
    setAllFocuses(allF);
  }, [companyId]);

  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, [companyId, loadData]);

  const handleDeleteAddress = async (addressId: number) => {
    const success = await deleteCompanyAddress({ companyId, addressId });
    if (success === 0) {
      setAddresses((prev) => prev.filter((a) => a.id !== addressId));
      onUpdate?.();
    }
  };

  const handleDeleteFocus = async (businessFocusId: number) => {
    const success = await deleteCompanyBusinessFocus({
      companyId,
      businessFocusId,
    });
    if (success === 0) {
      setFocuses((prev) => prev.filter((f) => f.id !== businessFocusId));
      onUpdate?.();
    }
  };
  const unassignedAddresses = allAddresses.filter(
    (a) => !addresses.find((linked) => linked.id === a.id)
  );

  const unassignedFocuses = allFocuses.filter(
    (f) => !focuses.find((linked) => linked.id === f.id)
  );
  if (loading) return <p>Loading details...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <strong>Addresses</strong>
        <table style={{ width: '100%', marginTop: '0.5rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Full Address</th>
              <th>HQ?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((a) =>
              editAddressId === a.id ? (
                <tr key={`edit-address-${a.id}`}>
                  <td>
                    <input
                      disabled
                      type="text"
                      value={editableAddress.line1}
                      onChange={(e) =>
                        setEditableAddress({
                          ...editableAddress,
                          line1: e.target.value,
                        })
                      }
                      placeholder="Line 1"
                    />
                    <br />
                    <input
                      type="text"
                      disabled
                      value={editableAddress.city}
                      onChange={(e) =>
                        setEditableAddress({
                          ...editableAddress,
                          city: e.target.value,
                        })
                      }
                      placeholder="City"
                    />
                    <br />
                    <input
                      type="text"
                      disabled
                      value={editableAddress.state}
                      onChange={(e) =>
                        setEditableAddress({
                          ...editableAddress,
                          state: e.target.value,
                        })
                      }
                      placeholder="State"
                    />
                    <br />
                    <input
                      type="text"
                      disabled
                      value={editableAddress.zip}
                      onChange={(e) =>
                        setEditableAddress({
                          ...editableAddress,
                          zip: e.target.value,
                        })
                      }
                      placeholder="ZIP"
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={editableAddress.isHQ}
                      onChange={(e) =>
                        setEditableAddress({
                          ...editableAddress,
                          isHQ: e.target.checked,
                        })
                      }
                    />
                  </td>
                  <td>
                    <div style={{ whiteSpace: 'nowrap' }}>
                      <AddButton
                        onClick={async () => {
                          const success =
                            editableAddress.isHQ !== undefined &&
                            (await updateCompanyLocation({
                              companyId,
                              addressId: a.id,
                              isHQ: editableAddress.isHQ,
                            }));
                          if (success === 0) {
                            setEditAddressId(null);
                            loadData();
                          } else {
                            alert('Update failed');
                          }
                        }}
                      />
                      <CancelButton onClick={() => setEditAddressId(null)} />
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={`edit-address2-${a.id}`}>
                  <td>
                    <span
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => {
                        setEditAddressId(a.id);
                        setEditableAddress({
                          line1: a.line1,
                          line2: a.line2,
                          city: a.city,
                          state: a.state,
                          zip: a.zip,
                          isHQ: a.isHQ || false,
                        });
                      }}
                    >
                      {a.line1}, {a.city}, {a.state} {a.zip}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {a.isHQ ? 'Yes' : 'No'}
                  </td>
                  <td>
                    <DeleteButton onClick={() => handleDeleteAddress(a.id)} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '0.75rem' }}>
        <select
          value={selectedAddressId ?? ''}
          onChange={(e) => setSelectedAddressId(Number(e.target.value))}
        >
          <option value="">Select address to add...</option>
          {unassignedAddresses.map((a) => (
            <option key={a.id} value={a.id}>
              {a.line1}, {a.city}, {a.state}
            </option>
          ))}
        </select>
        <button
          onClick={async () => {
            if (selectedAddressId != null) {
              const success = await addCompanyAddress({
                companyId,
                addressId: selectedAddressId,
                isHQ: false,
              });
              if (success === 0) {
                setSelectedAddressId(null);
                loadData();
              } else {
                alert('Failed to add address');
              }
            }
          }}
          style={{ marginLeft: '0.5rem' }}
        >
          ➕ Add Address
        </button>
      </div>

      <div>
        <strong>Business Focuses</strong>
        <ul>
          {focuses.map((f) => (
            <li key={`bf-${f.id}`}>
              {f.description}
              <DeleteButton onClick={() => handleDeleteFocus(f.id)} />
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '0.5rem' }}>
          <select
            value={selectedFocusId ?? ''}
            onChange={(e) => setSelectedFocusId(Number(e.target.value))}
          >
            <option value="">Select focus to add...</option>
            {unassignedFocuses.map((f) => {
              return (
                <option key={f.id} value={f.id}>
                  {f.description}
                </option>
              );
            })}
          </select>
          <button
            onClick={async () => {
              if (selectedFocusId != null) {
                const success = await addCompanyBusinessFocus({
                  companyId,
                  businessFocusId: selectedFocusId,
                });
                if (success === 0) {
                  setSelectedFocusId(null);
                  loadData();
                } else {
                  alert('Failed to add focus');
                }
              }
            }}
          >
            ➕ Add Focus
          </button>
        </div>
      </div>
    </div>
  );
}
