import { useEffect, useState } from 'react'
import type { ResearchItem } from './types/types'
import { TableHeader } from './components/crowdsourcedResearch/TableHeader'
import { TableCell } from './components/crowdsourcedResearch/TableCell'
import { DeleteButton } from './components/crowdsourcedResearch/DeleteButton'
import { AddButtonRow } from './components/crowdsourcedResearch/AddButtonRow'
import { formatDate } from './utils/formatDate'
import { fetchCrowdsourcedResearch } from './graphql/fetchCrowdsourceResearch'
import { deleteCrowdsourcedResearch } from './graphql/deleteCrowdsourceResearch'


function App() {
  const [items, setItems] = useState<ResearchItem[]>([])
  const [loading, setLoading] = useState(true)
  const [addingtRow, setAddingRow] = useState(false)
  
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

  const handleAddNew = () => {
    console.log("Add New clicked")
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
          <TableHeader label="Description" />
          <TableHeader label="Created" />
          <TableHeader label="Notes" />
          <TableHeader label="Delete" />
        </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
                <TableCell nowrap>{item.name}</TableCell>
                <TableCell nowrap>{item.description}</TableCell>
                <TableCell nowrap >{formatDate(item.created)}</TableCell>
                <TableCell>{item.notes}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => handleDelete(item.crowdsourced_id)} />
                </TableCell>
            </tr>
          ))}
          {!addingtRow &&  <AddButtonRow onClick={handleAddNew} />}          
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
