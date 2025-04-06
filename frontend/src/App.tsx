import { useEffect, useState } from 'react'
import type { Company, OwnershipType,  ResearchItem } from './types/types'
import { TableHeader } from './components/crowdsourcedResearch/TableHeader'
import { TableCell } from './components/crowdsourcedResearch/TableCell'
import { DeleteButton } from './components/crowdsourcedResearch/DeleteButton'
import { AddButtonRow } from './components/crowdsourcedResearch/AddButtonRow'
import { formatDate } from './utils/formatDate'
import { fetchCrowdsourcedResearch } from './graphql/fetchCrowdsourceResearch'
import { deleteCrowdsourcedResearch } from './graphql/deleteCrowdsourceResearch'
import { createCrowdsourcedResearch } from './graphql/createCrowdsourcedResearch'
import { fetchCompanies } from './graphql/fetchCompanies'
import { fetchOwnershipTypes } from './graphql/fetchOwnershipTypes'
import { EditButton } from './components/crowdsourcedResearch/EditButton'
import ResearchEditRow from './components/crowdsourcedResearch/EditResearchRow'
import { updateCrowdsourcedResearch } from './graphql/updateCrowdsourcedResearch'


function App() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);
  const [newEntry, setNewEntry] = useState({
    companyId: '',
    ownershipTypeId: '',
    notes: ''
  })
  const [companies, setCompanies] = useState<Company[]>([])
  const [ownershipTypes, setOwnershipTypes] = useState<OwnershipType[]>([])
  const [editItem, setEditItem] = useState<ResearchItem | null>(null)
  
  const [editableRowData, setEditableRowData] = useState({
    companyId: '',
    ownershipTypeId: '',
    notes: ''
  })
  
  
  const refetch = async () => {
    const data = await fetchCrowdsourcedResearch()
    setItems(data)
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCrowdsourcedResearch()
        setItems(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [])

  useEffect(() => {
    const load = async () => {
      const [c, o] = await Promise.all([
        fetchCompanies(),
        fetchOwnershipTypes()
      ])
      setCompanies(c)
      setOwnershipTypes(o)
    }
  
    load()
  }, [])
  

  const handleDelete = async (id: number) => {
      try {
        const success = await deleteCrowdsourcedResearch(id)
        if (success) {
          setItems(prev => prev.filter(item => item.crowdsourcedId !== id))
        } else {
          alert('Delete failed.')
        }
      } catch (err) {
        console.error('Delete error:', err)
        alert('Something went wrong while deleting.')
      }
    }
  const handleSaveNewEntry = async () => {
    const { companyId, ownershipTypeId, notes } = newEntry
    if (!companyId || !ownershipTypeId || !notes.trim()) {
      alert('Please fill out all fields')
      return
  }


  const success = await createCrowdsourcedResearch({
    companyId: Number(companyId),
    ownershipTypeId: Number(ownershipTypeId),
    observingPersonId: 1, // TODO: Replace with actual person ID. Right now, database looks up the first valid id.
    notes
  })
 
  if (success) {
    setNewEntry({ companyId: '', ownershipTypeId: '', notes: '' })
    setAddingRow(false)
    refetch()
  } else {
    alert('Failed to save entry.')
  }
}

const handleUpdate = async () => {
  if (!editItem) return

  const success = await updateCrowdsourcedResearch({
    id: editItem.crowdsourcedId,
    ownershipTypeId: Number(editableRowData.ownershipTypeId),
    notes: editableRowData.notes
  })

  if (success) {
    setEditItem(null)
    await refetch()
  } else {
    alert('Update failed')
  }
}
  const handleAddNew = () => {
    setAddingRow(true)
  }
 
const readOnlyRow = (item: ResearchItem, idx: number) =>  
  (
    <tr key={idx}>
      <TableCell nowrap>
      <EditButton
          label={item.companyName}
          onClick={() => {
             setEditItem(item)
             setEditableRowData({
               companyId: String(item.companyId),
               ownershipTypeId: String(item.ownershipTypeId),
               notes: item.notes || ''
            })
          }}
        />
      </TableCell>
      <TableCell nowrap>{item.ownershipTypeDescription}</TableCell>
      <TableCell nowrap>{formatDate(item.created)}</TableCell>
      <TableCell>{item.notes}</TableCell>
      <TableCell>
        <DeleteButton onClick={() => handleDelete(item.crowdsourcedId)} />
      </TableCell>
    </tr>
    )
 
    const displayData = items.map((item, idx) =>   editItem?.crowdsourcedId === item.crowdsourcedId ? (
      <ResearchEditRow
        key={idx}
        value={editableRowData}
        onChange={(field, val) => setEditableRowData({ ...editableRowData, [field]: val })}
        onSave={handleUpdate}
        companies={companies}
        ownershipTypes={ownershipTypes}
        onCancel={() => setEditItem(null)}
      />
    ) : (
      readOnlyRow(item, idx)
    )
  )

  const logo = (
    <img
    src="/FerretOutLogo.png"
    alt="FOPEC logo"
    style={{ width: '50%', height: '50%', marginLeft: '2rem' }}
  />
  )

  return (
    <div style={{ display: 'flex', flexDirection : 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '1rem', flex:1 }}>
      <div style={{ display: 'flex', flex:1, flexDirection : 'column', alignItems: 'flex-start' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div><h2>See the Hands Holding the Strings</h2></div> 
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
          <TableHeader label="Name" nowrap />
          <TableHeader label="Type" />
          <TableHeader label="Created" />
          <TableHeader label="Notes" />
          <TableHeader label="Action" />
        </tr>
        </thead>
        <tbody>
          {displayData}
          {!addingRow && <AddButtonRow onClick={handleAddNew} />}
          {addingRow && (
            <ResearchEditRow
              value={newEntry}
              onChange={(field, val) => setNewEntry({ ...newEntry, [field]: val })}
              onSave={handleSaveNewEntry}
              companies={companies}
              ownershipTypes={ownershipTypes}
              onCancel={() => setAddingRow(false)}
            />
          )}

        </tbody>
      </table>
      </>
      )}
      </div>
    {logo}
    </div>
  )
}

export default App
