import React, { useEffect, useState } from 'react'
import { fetchOwnershipTypes } from '../../graphql/fetchOwnershipTypes'
import { OwnershipTypes, OwnershipTypeSelectProps } from '../../types/types'




const OwnershipTypeSelect: React.FC<OwnershipTypeSelectProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const [types, setTypes] = useState<OwnershipTypes[]>([])

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data = await fetchOwnershipTypes()
        setTypes(data)
      } catch (err) {
        console.error('Error fetching ownership types:', err)
      }
    }

    loadTypes()
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Select a type</option>
      {types.map(type => (
        <option key={type.id} value={type.id}>
          {type.description}
        </option>
      ))}
    </select>
  )
}

export default OwnershipTypeSelect
