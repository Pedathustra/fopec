

export type AddButtonProps = {
  onClick: () => void
}

export type AddButtonRowProps = {
    onClick: () => void
    colSpan?: number
  }

 export type AddResearchRowProps = {
  value: {
    companyId: string
    ownershipTypeId: string
    notes: string
  }
  onChange: (field: keyof AddResearchRowProps['value'], value: string) => void
  onSave: () => void
  companies: Company[]
  ownershipTypes: OwnershipType[]
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
  companies: Company[]
  disabled?: boolean
}


export type DeleteButtonProps = {
  onClick: () => void
}


export type OwnershipType = {
  id: number;
  description: String  
}

export type OwnershipTypeSelectProps = {
  value: string | number
  onChange: (value: string) => void
  ownershipTypes: OwnershipType[]
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


