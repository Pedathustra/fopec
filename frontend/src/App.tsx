import { useEffect, useState } from 'react';
import { CrowdsourcedResearch } from './components/crowdsourcedResearch/CrowdsourcedResearch';
import { Menu } from './components/layout/Menu';
import { AppView } from './types/types';
import { Vote } from './components/vote/Vote';
import { CompanyManager } from './components/company/CompanyManager';
import { AddressManager } from './components/address/AddressManager';
import { PersonActivity } from './components/personActivity/PersonActivity';
import { Login } from './components/auth/Login';
import { PersonForm } from './components/auth/PersonForm';

type Page = 'login' | 'register' | 'main';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState<Page>('login');
  const [view, setView] = useState<AppView>('vote');
  const isAuthenticated = !!token;

  const logo = (
    <img
      src="/FerretOutLogo.png"
      alt="FOPEC logo"
      style={{ width: '50%', height: '50%', marginLeft: '2rem' }}
    />
  );

  useEffect(() => {
    const handleRegister = () => setPage('register');
    const handleLogin = () => setPage('login');

    window.addEventListener('triggerRegister', handleRegister);
    window.addEventListener('triggerLogin', handleLogin);

    return () => {
      window.removeEventListener('triggerRegister', handleRegister);
      window.removeEventListener('triggerLogin', handleLogin);
    };
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setPage('main');
    }
  }, []);

  const renderMainContent = () => {
    if (!isAuthenticated) {
      if (page === 'login') {
        return (
          <Login
            onLogin={(jwt: string) => {
              localStorage.setItem('token', jwt);
              setToken(jwt);
              setPage('main');
            }}
          />
        );
      }
      if (page === 'register') {
        return (
          <PersonForm mode="register" onSuccess={() => setPage('login')} />
        );
      }
      return <></>;
    }
    return (
      <div style={{ display: 'flex' }}>
        <Menu
          currentView={view}
          onSelect={(selection) => setView(selection)}
          onLogout={() => {
            localStorage.removeItem('token');
            setToken(null);
            setPage('login');
          }}
        />
        <main style={{ padding: '1rem', flex: 1 }}>
          {view === 'address' && <AddressManager />}
          {view === 'company' && <CompanyManager />}
          {view === 'crowdsourcedResearch' && <CrowdsourcedResearch />}
          {view === 'vote' && <Vote />}
          {view === 'editProfile' && <PersonForm mode="update" />}
          {view === 'personActivity' && <PersonActivity />}
        </main>
      </div>
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '1rem',
        flex: 1,
      }}
    >
      <div style={{ flex: 1 }}>{renderMainContent()}</div>
      {logo}
    </div>
  );
}

export default App;
