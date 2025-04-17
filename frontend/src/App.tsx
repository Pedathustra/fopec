import { useEffect, useState } from 'react'
import { CrowdsourcedResearch } from './components/crowdsourcedResearch/CrowdsourcedResearch'
import { AuthForm } from './components/auth/AuthForm'
import { Menu } from './components/layout/Menu'
import { AppView } from './types/types'
import { Vote } from './components/vote/Vote'
import { Company } from './components/company/Company'

type Page = 'login' | 'register' | 'main'

function App() {
  const [token, setToken] = useState<string | null>(null)
  const [page, setPage] = useState<Page>('login')
  const [view, setView] = useState<AppView>('vote');
  const isAuthenticated = !!token

  const logo = (
    <img
      src="/FerretOutLogo.png"
      alt="FOPEC logo"
      style={{ width: '50%', height: '50%', marginLeft: '2rem' }}
    />
  )
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setPage('main')
    }
  }, [])
  const renderMainContent = () => {
    if (!isAuthenticated) {
      return page === 'login' ? (
          <AuthForm onLogin={(jwt: string) => {
            localStorage.setItem('token', jwt) 
            setToken(jwt)
            setPage('main')
          }} />
      ) : (
        <></>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Menu
            onLogout={() => {
              localStorage.removeItem('token')
              setToken(null)
              setPage('login')
            }}
            onSelect={(selection) => {
              setView(selection)
            }}
        />
        {view === 'crowdsourcedResearch' && <CrowdsourcedResearch />}
        {view === 'vote' && <Vote />}
        {view === 'company' && <Company />}
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
