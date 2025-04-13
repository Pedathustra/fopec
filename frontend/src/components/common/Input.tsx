import React from 'react'

interface InputProps {
  value: string
  onChange: (val: string) => void
  placeholder: string
  type?: 'text' | 'password'
  multiline?: boolean
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
}: InputProps) {
  return (
   <> <style>
   {`
     .input-wrapper {
       position: relative;
       display: flex;
       flex-direction: column;
     }

     .hover-label {
       position: absolute;
       top: -1.2rem;
       left: 0;
       font-size: 0.75rem;
       color: #666;
       background: white;
       padding: 0 4px;
       opacity: 0;
       transition: opacity 0.2s ease-in-out;
       pointer-events: none;
     }

     .input-wrapper:hover .hover-label {
       opacity: 1;
     }
   `}
 </style>
    <div className="input-wrapper">
      <span className="hover-label">{placeholder}</span>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
    </> 
  )
}
