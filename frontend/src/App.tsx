import { useState } from 'react'
import { CrowdsourcedResearch } from './components/crowdsourcedResearch/CrowdsourcedResearch'
import { AuthForm } from './components/auth/AuthForm'
//import { RegisterForm } from './components/auth/RegisterForm'
import { Menu } from './components/layout/Menu'

type Page = 'login' | 'register' | 'main'

function App() {
  const [token, setToken] = useState<string | null>(null)
  const [page, setPage] = useState<Page>('login')

  const isAuthenticated = !!token

  const logo = (
    <img
      src="/FerretOutLogo.png"
      alt="FOPEC logo"
      style={{ width: '50%', height: '50%', marginLeft: '2rem' }}
    />
  )

  const renderMainContent = () => {
    if (!isAuthenticated) {
      return page === 'login' ? (
          <AuthForm onSuccess={(jwt: string) => {
            setToken(jwt)
            setPage('main')
          }} />
      ) : (
        <></>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Menu onSelect={(selection) => {
          if (selection === 'crowdsourcedResearch') {
            setPage('main')
          }
        }} />
        <CrowdsourcedResearch />
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: '1rem',
      flex: 1,
    }}>
      <div style={{ flex: 1 }}>{renderMainContent()}</div>
      {logo}
    </div>
  )
}

export default App
