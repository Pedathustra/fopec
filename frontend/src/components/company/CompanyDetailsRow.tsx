import { useEffect, useState } from 'react';
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

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, [companyId]);

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
        <ul>
          {addresses.map((a) => (
            <li key={a.id}>
              {a.line1}, {a.city}, {a.state} {a.zip} {a.isHQ ? '(HQ)' : ''}
              <DeleteButton onClick={() => handleDeleteAddress(a.id)} />
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '0.5rem' }}>
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
          >
            ➕ Add Address
          </button>
        </div>
      </div>

      <div>
        <strong>Business Focuses</strong>
        <ul>
          {focuses.map((f) => (
            <li key={f.id}>
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
            {unassignedFocuses.map((f) => (
              <option key={f.id} value={f.id}>
                {f.description}
              </option>
            ))}
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
