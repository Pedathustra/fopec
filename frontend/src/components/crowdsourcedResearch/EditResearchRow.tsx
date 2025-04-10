import React from 'react'
import { TableCell } from './TableCell'
import CompanySelect from '../common/CompanySelect'
import OwnershipTypeSelect from '../common/OwnershipTypeSelect'
import AddButton from './AddButton'
import { ResearchEditRowProps } from '../../types/types'
import { CancelButton } from './CancelButton'

const ResearchEditRow: React.FC<ResearchEditRowProps> = ({
  value,
  onChange,
  onSave,
  companies,
  ownershipTypes,
  onCancel
}) => {
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
      <TableCell /> {/* Created is handled by backend */}
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
        <CompanySelect
          value={value.parentCompanyId}
          onChange={(val) => onChange('parentCompanyId', val)}
          companies={companies}
        />
      </TableCell>
      <TableCell>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AddButton onClick={onSave} />
            <CancelButton onClick={onCancel} />
        </div>
      </TableCell>
    </tr>
  )
}

export default ResearchEditRow
