import React from 'react'
import { AddButtonProps } from '../types/types'


export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      fontSize: '0.9rem',
      padding: '0.25rem 0.75rem',
      backgroundColor: 'black',
      color: 'white',
      border: '1px solid white',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    }}
  >
    <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>+</span>
    Add
  </button>
)
 
