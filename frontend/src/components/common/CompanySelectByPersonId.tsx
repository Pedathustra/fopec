import React, { useEffect, useState } from 'react';
import { usePersonId } from '../../hooks/usePersonId';
import { fetchCompaniesByPersonId } from '../../graphql/fetchCompaniesByPersonId';
import type { Company } from '../../types/types';
import { CompanySelectProps } from '../../types/types';

export const CompanySelectByPersonId: React.FC<CompanySelectProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const personId = usePersonId();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    if (personId) {
      fetchCompaniesByPersonId(personId).then(setCompanies);
    }
  }, [personId]);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select a company</option>
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  );
};
