import { useEffect, useState } from 'react';
import { fetchPersons, PersonBasic } from '../../graphql/fetchPersons';

type Props = {
  value: number | null;
  onChange: (id: number) => void;
};

export function PersonsSelect({ value, onChange }: Props) {
  const [persons, setPersons] = useState<PersonBasic[]>([]);

  useEffect(() => {
    fetchPersons().then(setPersons);
  }, []);

  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="">Select a User...</option>
      {persons.map((p) => (
        <option key={p.id} value={p.id}>
          {p.username} ({p.firstName} {p.lastName})
        </option>
      ))}
    </select>
  );
}
