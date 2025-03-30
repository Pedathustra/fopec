

export type AddButtonRowProps = {
    onClick: () => void
    colSpan?: number
  }

export type ButtonProps = {
    onClick: () => void
  }
  
export type Company = {
  id: string;
  name: string;
  created: string;
  last_updated: string;
}
export type CompanySelectProps = {
  value: string | number
  onChange: (value: string) => void
  disabled?: boolean
}

export type DeleteButtonProps = {
  onClick: () => void
}


export type OwnershipTypes = {
  id: number;
  description: String  
}

export type OwnershipTypeSelectProps = {
  value: string | number
  onChange: (value: string) => void
  disabled?: boolean
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


