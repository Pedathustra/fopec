
export type AddButtonProps = {
  onClick: () => void
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
    children: React.ReactNode
    nowrap?: boolean
  }


export type TableHeaderProps = {
    label: string
    nowrap?: boolean
  }