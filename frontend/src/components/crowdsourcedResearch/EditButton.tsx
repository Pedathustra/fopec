import React from 'react'
import { EditButtonProps } from '../../types/types'


export const EditButton: React.FC<EditButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    title={`Edit ${label}`}
    style={{
      background: 'none',
      border: 'none',
      color: '#888',
      textDecoration: 'underline',
      cursor: 'pointer',
      padding: 0,
      font: 'inherit'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.color = '#444'
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.color = '#888'
    }}
  >
    {label}
  </button>
)

 