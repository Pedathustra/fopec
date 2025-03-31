import React, { useEffect, useState } from 'react'
 
import { Company, CompanySelectProps } from '../../types/types'
import { fetchCompanies } from '../../graphql/fetchCompanies'


const CompanySelect: React.FC<CompanySelectProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies()
        setCompanies(data)
      } catch (err) {
        console.error('Error fetching companies:', err)
      }
    }

    loadCompanies()
  }, [])
  return (
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
}

export default CompanySelect
