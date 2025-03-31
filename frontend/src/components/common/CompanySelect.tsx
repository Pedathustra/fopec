import React from 'react'
import {  CompanySelectProps } from '../../types/types'

const CompanySelect: React.FC<CompanySelectProps> = ({
  value,
  onChange,
  companies,
  disabled = false
}) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select a company</option>
      {companies.map(company => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  )

export default CompanySelect
