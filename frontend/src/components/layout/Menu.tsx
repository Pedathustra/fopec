interface MenuProps {
    onSelect: (view: 'crowdsourcedResearch') => void
  }
  
  export function Menu({ onSelect }: MenuProps) {
    return (
      <nav style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => onSelect('crowdsourcedResearch')}>
          Crowdsourced Research
        </button>
      </nav>
    )
  }
  