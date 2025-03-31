import React from 'react'
import { TableCell } from './TableCell';
import { AddResearchRowProps } from '../../types/types';
import CompanySelect from '../common/CompanySelect';
import OwnershipTypeSelect from '../common/OwnershipTypeSelect';
import AddButton from './AddButton';

 
 export const AddResearchRow: React.FC<AddResearchRowProps> = ({ value, onChange, onSave, companies, ownershipTypes }) => {
  return (
    <tr>
      <TableCell>
      <CompanySelect
        value={value.companyId}
        onChange={(val) => onChange('companyId', val)}
        companies={companies}
      />
      </TableCell>
      <TableCell>

      <OwnershipTypeSelect
        value={value.ownershipTypeId}
        onChange={(val) => onChange('ownershipTypeId', val)}
        ownershipTypes={ownershipTypes}
      />
      </TableCell>
      <TableCell /> {/* Created timestamp handled on the backend */}
      <TableCell>
        <textarea
          rows={3}
          style={{ width: '100%' }}
          value={value.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Enter notes"
        />
      </TableCell>
      <TableCell>
        <AddButton onClick={onSave}/>
      </TableCell>
    </tr>
  )
}

export default AddResearchRow