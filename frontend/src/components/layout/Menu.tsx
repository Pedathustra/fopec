import { AppView } from "../../types/types";
import { LogoutButton } from "../auth/LoutgoutButton"

interface MenuProps {
    onSelect: (view: AppView) => void
    onLogout: () => void
  }
  
  const menuItems: { label: string; view: AppView }[] = [
    { label: 'Vote', view: 'vote' },
    { label: 'Company', view: 'company' },
    { label: 'Crowdsourced Research', view: 'crowdsourcedResearch' },
  ]

  export function Menu({ onSelect, onLogout }: MenuProps) {
    return (
      <nav style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        {menuItems.map(item => (
          <button key={item.view} onClick={() => onSelect(item.view)}>
            {item.label}
          </button>
        ))}
        <LogoutButton onLogout={onLogout} />
      </nav>
    )
  }
  
  