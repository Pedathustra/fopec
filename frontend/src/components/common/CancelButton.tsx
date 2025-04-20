import React from 'react'
import { CancelButtonProps } from '../../types/types'


export const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    title="Cancel"
    aria-label="Cancel"
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '0.5rem'
    }}
  >
    ❌
  </button>
)

 
