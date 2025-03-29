import type { DeleteButtonProps } from "../types/types"


export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
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