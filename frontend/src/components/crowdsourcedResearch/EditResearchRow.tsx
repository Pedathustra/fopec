import React from 'react';
import { TableCell } from '../common/TableCell';
import { CompanySelectByPersonId } from '../common/CompanySelectByPersonId';

import OwnershipTypeSelect from '../common/OwnershipTypeSelect';
import { AddButton } from '../common/AddButton';
import { ResearchEditRowProps } from '../../types/types';
import { CancelButton } from '../common/CancelButton';

const ResearchEditRow: React.FC<ResearchEditRowProps> = ({
  value,
  onChange,
  onSave,
  companies,
  ownershipTypes,
  onCancel,
}) => {
  return (
    <tr>
      <TableCell>
        <CompanySelectByPersonId
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
        <CompanySelectByPersonId
          value={value.parentCompanyId === null ? '' : value.parentCompanyId}
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
  );
};

export default ResearchEditRow;
