import React from 'react';

export type AddButtonProps = {
  onClick: () => void;
};

export type AddButtonRowProps = {
  onClick: () => void;
  colSpan?: number;
};

export type Address = {
  id: number;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  isHQ?: boolean;
};

export type AppView =
  | 'vote'
  | 'company'
  | 'crowdsourcedResearch'
  | 'editProfile'
  | 'address'
  | 'personActivity'
  | 'businessFocus'
  | 'ownershipType'
  | 'persons'
  | 'databaseObjects';

export type BusinessFocus = {
  id: number;
  description: string;
};

export type ButtonProps = {
  onClick: () => void;
};

export type CancelButtonProps = {
  onClick: () => void;
};

export type Company = {
  id: number;
  name: string;
  created: string;
  lastUpdated: string;
  personIdCreated: number;
};

export type CompanySelectProps = {
  value: string | number;
  onChange: (value: string) => void;
  companies: Company[];
  disabled?: boolean;
};

export type DeleteButtonProps = {
  onClick: () => void;
};

export type EditButtonProps = {
  label: string;
  onClick: () => void;
};
export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  password?: string;
  username: string;
  isActive?: boolean;
};

export type CreatePerson = Omit<Person, 'id'>;

export type OwnershipType = {
  id: number;
  description: string;
};

export type OwnershipTypeSelectProps = {
  value: string | null;
  onChange: (value: string) => void;
  ownershipTypes: OwnershipType[];
  disabled?: boolean;
};

export type ResearchEditRowProps = {
  value: {
    companyId: string;
    ownershipTypeId: string;
    notes: string;
    parentCompanyId: string | null;
  };
  onChange: (field: keyof ResearchEditRowProps['value'], value: string) => void;
  onSave: () => void;
  companies: Company[];
  ownershipTypes: OwnershipType[];
  onCancel: () => void;
};

export type ResearchItem = {
  crowdsourcedId: number;
  companyId: number;
  companyName: string;
  parentCompanyId: string | null;
  parentCompanyName: string | null;
  ownershipTypeId: number;
  ownershipTypeDescription: string;
  username: string;
  created: string;
  notes: string;
};

export type TableCellProps = {
  children?: React.ReactNode;
  nowrap?: boolean;
};

export type TableHeaderProps = {
  label: string;
  nowrap?: boolean;
};

export type PersonActivity = {
  id: number;
  displayName: string;
  isActive: boolean;
  auditRecords: number;
  companyRecords: number;
  crowdsourcedResearchRecords: number;
  voteRecords: number;
};

export type DatabaseObjectCounts = {
  tableCount: number;
  viewCount: number;
  procedureCount: number;
  functionCount: number;
  triggerCount: number;
};
