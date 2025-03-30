import type { TableHeaderProps } from "../../types/types"
  
  export const TableHeader: React.FC<TableHeaderProps> = ({ label, nowrap = false }) => (
    <th
      style={{
        textAlign: 'left',
        borderBottom: '1px solid #ccc',
        whiteSpace: nowrap ? 'nowrap' : 'normal'
      }}
    >
      {label}
    </th>
  )