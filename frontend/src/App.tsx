import { useEffect, useState } from 'react'
import React from 'react'
type ResearchItem = {
  name: string
  description: string
  username: string
  created: string
  notes: string
  crowdsourced_id: number
}
type DeleteButtonProps = {
  onClick: () => void
}
function App() {
  const [items, setItems] = useState<ResearchItem[]>([])
  const [loading, setLoading] = useState(true)

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
    console.log('howdy!', id)
  })

  const logo = (
    <img
    src="/FerretOutLogo.png"
    alt="FOPEC logo"
    style={{ width: '50%', height: '50%', marginLeft: '2rem' }}
  />
  )
  const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      aria-label="Delete"
      title="Delete"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
      </svg>
    </button>
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
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Description</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Username</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Created</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Notes</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ padding: '0.5rem' }}>{item.name}</td>
              <td style={{ padding: '0.5rem' }}>{item.description}</td>
              <td style={{ padding: '0.5rem' }}>{item.username}</td>
              <td style={{ padding: '0.5rem' }}>{item.created}</td>
              <td style={{ padding: '0.5rem' }}>{item.notes}</td>
              <td style={{ padding: '0.5rem' }}>
                <DeleteButton onClick={() => handleDelete(item.crowdsourced_id)} /> 
              </td>
            </tr>
          ))}
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
