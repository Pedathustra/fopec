import { AppView } from "../../types/types"
import { LogoutButton } from "../auth/LoutgoutButton"

 
 

interface MenuProps {
  onSelect: (view: AppView) => void
  onLogout: () => void
  currentView: AppView
}

const menuItems: { label: string; view: AppView }[] = [
  { label: 'Vote', view: 'vote' },
  { label: 'Company', view: 'company' },
  { label: 'Crowdsourced Research', view: 'crowdsourcedResearch' },
  { label: 'Edit Profile', view: 'editProfile' },
  { label: 'Account Activity', view: 'personActivity' },
  { label: 'Address', view: 'address' },
]

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
  )
}
