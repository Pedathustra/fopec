import React from 'react'
import {  OwnershipTypeSelectProps } from '../../types/types'


const OwnershipTypeSelect: React.FC<OwnershipTypeSelectProps> = ({
  value,
  onChange,
  ownershipTypes,
  disabled = false
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
  >
    <option value="">Select a type</option>
    {ownershipTypes.map((type) => (
      <option key={type.id} value={type.id}>
        {type.description}
      </option>
    ))}
  </select>
)


export default OwnershipTypeSelect
