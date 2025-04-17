export  function LogoutButton({ onLogout }: { onLogout: () => void }) {
    return (
      <button
        style={{
          padding: '0.5rem 1rem',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={onLogout}
      >
        Logout
      </button>
    )
  }
  