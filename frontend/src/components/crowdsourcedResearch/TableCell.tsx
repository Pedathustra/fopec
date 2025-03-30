import type { TableCellProps } from "../../types/types"

export const TableCell: React.FC<TableCellProps> = ({ children, nowrap = false }) => (
    <td
      style={{
        padding: '0.5rem',
        whiteSpace: nowrap ? 'nowrap' : 'normal'
      }}
    >
      {children}
    </td>
  )