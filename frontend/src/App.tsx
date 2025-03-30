import React, { useEffect, useState } from 'react'
import type { ResearchItem } from './types/types'
import { TableHeader } from './components/crowdsourcedResearch/TableHeader'
import { TableCell } from './components/crowdsourcedResearch/TableCell'
import { DeleteButton } from './components/crowdsourcedResearch/DeleteButton'
import { AddButtonRow } from './components/crowdsourcedResearch/AddButton'


function App() {
  const [items, setItems] = useState<ResearchItem[]>([])
  const [loading, setLoading] = useState(true)
  const [addingtRow, setAddingRow] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query {
          getCrowdsourcedResearch {
            crowdsourced_id
            name
            description
            username
            created
            notes
          }
        }
      `

      try {
        const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        })

        const json = await res.json()
        setItems(json.data.getCrowdsourcedResearch)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = ((id?: number) => {
    console.log('delete record:', id)
  })

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
          <TableHeader label="Username" />
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
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.created}</TableCell>
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
