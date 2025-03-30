import React from 'react'
import { TableCell } from './TableCell';


type Company = { id: number; name: string }
type OwnershipType = { id: number; description: string }

type AddResearchRowProps = {
  companies: Company[]
  ownershipTypes: OwnershipType[]
  newEntry: {
    companyId: string
    ownershipTypeId: string
    notes: string
  }
  setNewEntry: (entry: AddResearchRowProps['newEntry']) => void
}

const AddResearchRow: React.FC<AddResearchRowProps> = ({
  companies,
  ownershipTypes,
  newEntry,
  setNewEntry
}) => (
  <tr>
    <TableCell>
      <select
        value={newEntry.companyId}
        onChange={e => setNewEntry({ ...newEntry, companyId: e.target.value })}
      >
        <option value="">Select a company</option>
        {companies.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </TableCell>
    <TableCell>
      <select
        value={newEntry.ownershipTypeId}
        onChange={e => setNewEntry({ ...newEntry, ownershipTypeId: e.target.value })}
      >
        <option value="">Select a type</option>
        {ownershipTypes.map(o => (
          <option key={o.id} value={o.id}>{o.description}</option>
        ))}
      </select>
    </TableCell>
    <TableCell />
    <TableCell>
      <input
        type="text"
        value={newEntry.notes}
        onChange={e => setNewEntry({ ...newEntry, notes: e.target.value })}
        style={{ width: '100%' }}
        placeholder="Enter notes"
      />
    </TableCell>
    <TableCell /> 
  </tr>
)

export default AddResearchRow
