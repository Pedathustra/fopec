

export type AddButtonRowProps = {
    onClick: () => void
    colSpan?: number
  }

export type ButtonProps = {
    onClick: () => void
  }
  
export type Company = {
  id: string;
  description: string;
  created: string;
  last_updated: string;
}

export type OwnershipTypes = {
  id: number;
  name: String  
}

export type DeleteButtonProps = {
  onClick: () => void
}

export type ResearchItem = {
    name: string
    description: string
    username: string
    created: string
    notes: string
    crowdsourced_id: number
  }

export  type TableCellProps = {
    children?: React.ReactNode
    nowrap?: boolean
  }


export type TableHeaderProps = {
    label: string
    nowrap?: boolean
  }