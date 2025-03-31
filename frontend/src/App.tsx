import { useEffect, useState } from 'react'
import type { Company, OwnershipType,  ResearchItem } from './types/types'
import { TableHeader } from './components/crowdsourcedResearch/TableHeader'
import { TableCell } from './components/crowdsourcedResearch/TableCell'
import { DeleteButton } from './components/crowdsourcedResearch/DeleteButton'
import { AddButtonRow } from './components/crowdsourcedResearch/AddButtonRow'
import { formatDate } from './utils/formatDate'
import { fetchCrowdsourcedResearch } from './graphql/fetchCrowdsourceResearch'
import { deleteCrowdsourcedResearch } from './graphql/deleteCrowdsourceResearch'
import AddResearchRow from './components/crowdsourcedResearch/AddResearchRow'
import { createCrowdsourcedResearch } from './graphql/createCrowdsourcedResearch'
import { fetchCompanies } from './graphql/fetchCompanies'
import { fetchOwnershipTypes } from './graphql/fetchOwnershipTypes'


function App() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingtRow, setAddingRow] = useState(false);
  const [newEntry, setNewEntry] = useState({
    companyId: '',
    ownershipTypeId: '',
    notes: ''
  })
  const [companies, setCompanies] = useState<Company[]>([])
  const [ownershipTypes, setOwnershipTypes] = useState<OwnershipType[]>([])

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
          setItems(prev => prev.filter(item => item.crowdsourced_id !== id))
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
    observingPersonId: 1, // TODO: Replace with actual person ID
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

  const handleAddNew = () => {
    setAddingRow(true)
  }
 
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
          {items.map((item, idx) => (
            <tr key={idx}>
              <TableCell nowrap>{item.name}</TableCell>
              <TableCell nowrap>{item.description}</TableCell>
              <TableCell nowrap>{formatDate(item.created)}</TableCell>
              <TableCell>{item.notes}</TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDelete(item.crowdsourced_id)} />
              </TableCell>
            </tr>
          ))}
          {!addingtRow && <AddButtonRow onClick={handleAddNew} />}
          {addingtRow && 
            <AddResearchRow
              value={newEntry}
              onChange={(field, val) => setNewEntry({ ...newEntry, [field]: val })}
              onSave={handleSaveNewEntry}
              companies={companies}
              ownershipTypes={ownershipTypes}
            />
          }
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
