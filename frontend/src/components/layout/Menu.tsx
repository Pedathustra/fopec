import { AppView } from '../../types/types';
import { LogoutButton } from '../auth/LogoutButton';

interface MenuProps {
  onSelect: (view: AppView) => void;
  onLogout: () => void;
  currentView: AppView;
}

const menuItems: { label: string; view: AppView }[] = [
  { label: 'Address', view: 'address' },
  { label: 'Company', view: 'company' },
  { label: 'Crowdsourced Research', view: 'crowdsourcedResearch' },
  { label: 'Vote', view: 'vote' },
  { label: 'Edit Profile', view: 'editProfile' },
  { label: 'Account Audit', view: 'personActivity' },
  { label: 'Business Focus', view: 'businessFocus' },
  { label: 'Ownership Type', view: 'ownershipType' },
  { label: 'Persons', view: 'persons' },
  { label: 'Database Objects', view: 'databaseObjects' },
];

export function Menu({ onSelect, onLogout, currentView }: MenuProps) {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '150px',
        padding: '1rem',
        gap: '1rem',
        borderRight: '1px solid #ccc',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {menuItems.map((item) => (
        <button
          key={item.view}
          onClick={() => onSelect(item.view)}
          style={{
            background: 'none',
            border: 'none',
            textAlign: 'left',
            fontSize: '1rem',
            cursor: 'pointer',
            padding: '0.5rem 0',
            fontWeight: currentView === item.view ? 'bold' : 'normal',
          }}
        >
          {item.label}
        </button>
      ))}
      <div style={{ marginTop: 'auto' }}>
        <LogoutButton onLogout={onLogout} />
      </div>
    </nav>
  );
}
