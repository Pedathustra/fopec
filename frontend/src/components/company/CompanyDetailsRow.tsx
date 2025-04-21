import { useEffect, useState } from 'react';
import { fetchAddressesByCompanyId } from '../../graphql/fetchAddressesByCompanyId';
import { fetchBusinessFocusesByCompanyId } from '../../graphql/fetchBusinessFocusesByCompanyId';
import { deleteCompanyAddress } from '../../graphql/deleteCompanyAddress';
import { deleteCompanyBusinessFocus } from '../../graphql/deleteCompanyBusinessFocus';
import { Address, BusinessFocus } from '../../types/types';
import { DeleteButton } from '../common/DeleteButton';

type Props = {
  companyId: number;
  onUpdate?: () => void;
};

export function CompanyDetailsRow({ companyId, onUpdate }: Props) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [focuses, setFocuses] = useState<BusinessFocus[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const [a, f] = await Promise.all([
      fetchAddressesByCompanyId(companyId),
      fetchBusinessFocusesByCompanyId(companyId),
    ]);
    setAddresses(a);
    setFocuses(f);
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
      </div>
    </div>
  );
}
