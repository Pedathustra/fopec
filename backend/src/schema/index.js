const { buildSchema } = require('graphql');

const schema = buildSchema(`
type ResearchItem {
    crowdsourcedId: Int
    companyId: Int
    companyName: String
    ownershipTypeId: Int
    ownershipTypeDescription: String
    parentCompanyId: Int
    username: String
    created: String
    notes: String
    parentCompanyName: String
  }
 type Address {
  id: Int!
  line1: String!
  line2: String
  city: String!
  state: String!
  zip: String!
  isHQ: Boolean
}


input AddressInput {
  line1: String!
  line2: String
  city: String!
  state: String!
  zip: String!
}   

type BusinessFocus {
  id: Int!
  description: String!
}

type Company {
  id: Int!
  name: String!
  created: String!
  lastUpdated: String!
  personIdCreated: Int!
}
 
type CreatePersonResult {
  success: Boolean!
  error: String
}
 
type OwnershipTypes{
    id: Int!
    description: String!
  }

type LoginResult {
  success: Boolean!
  error: String
  token: String
}
  
type Person {
  id: Int!
  firstName: String!
  lastName: String!
  middleName: String
  username: String!
  isActive: Boolean!
} 

type PersonBasic {
  id: Int!
  username: String!
  firstName: String!
  lastName: String!
}
type UpdatePersonResult {
  success: Boolean!
  error: String
}
type VoteSummary {
  companyName: String!
  ownershipTypeDescription: String!
  parentCompanyName: String
  id: Int!
  notes: String
  observer: String!
  observerId: Int!
  upCount: Int!
  downCount: Int!
}
type PersonAuditRecord {
  firstName: String!
  lastName: String!
  middleName: String
  username: String!
  createdDate: String
  updatedDate: String
  isActive: Boolean!
  recordType: String!
  idx: Int!
}

type PersonActivityRow {
  id: Int!
  displayName: String!
  isActive: Boolean!
  auditRecords: Int!
  companyRecords: Int!
  crowdsourcedResearchRecords: Int!
  voteRecords: Int!
}
type DatabaseObjectCounts {
  tableCount: Int!
  viewCount: Int!
  procedureCount: Int!
  functionCount: Int!
  triggerCount: Int!
}

type Query {
    getAddresses: [Address!]!
    getAddressesByCompanyId(companyId: Int!): [Address!]!
    getBusinessFocuses: [BusinessFocus!]!
    getBusinessFocusesByCompanyId(companyId: Int!): [BusinessFocus!]!
    getCrowdsourcedResearch: [ResearchItem]
    getCrowdsourcedResearchByPersonId(personId: Int!): [ResearchItem]
    getCompanies: [Company]
    getCompaniesByPersonId(personId: Int!): [Company!]!
    getOwnershipTypes: [OwnershipTypes]
    getPerson(id: Int!): Person
    getVotes(observerPersonId: Int!): [VoteSummary!]!    
    getPersons: [PersonBasic!]!
    getPersonAuditById(personId: Int!): [PersonAuditRecord!]!
    getPersonActivity(nameDisplayType: Int!): [PersonActivityRow!]!
    getDatabaseObjectCounts: DatabaseObjectCounts!
  }

  type Mutation {
    deleteCrowdsourcedResearch(id: Int!): Boolean
    updateCrowdsourcedResearch(
        id: Int!
        ownershipTypeId: Int!
        notes: String!
        parentCompanyId: Int
      ): Boolean
    createCrowdsourcedResearch(
      companyId: Int!
      ownershipTypeId: Int!
      observingPersonId: Int!
      notes: String!
      parentCompanyId: Int
      ): Boolean
    createPerson(
      firstName: String!
      lastName: String!
      middleName: String
      username: String!
      password: String!
      ): CreatePersonResult!
    login(username: String!, password: String!): LoginResult!
    updatePerson(
      id: Int!
      firstName: String!
      lastName: String!
      middleName: String
      username: String!
      password: String!
      isActive: Boolean
    ): UpdatePersonResult!
    insertAddress(
      line1: String!
      line2: String
      city: String!
      state: String!
      zip: String!
  ): Int!
  updateAddress(
      id: Int!
      line1: String!
      line2: String
      city: String!
      state: String!
      zip: String!
  ): Int!

  deleteAddress(id: Int!): Int!
  insertCompany(name: String!, personIdCreated: Int!): Int!
  updateCompany(id: Int!, name: String!): Int!
  updateCompanyLocation(companyId: Int!, addressId: Int!, isHQ: Boolean!): Int!
  deleteCompany(id: Int!): Int!

  addCompanyAddress(companyId: Int!, addressId: Int!, isHQ: Boolean!): Int!
  deleteCompanyAddress(companyId: Int!, addressId: Int!): Int!

  addCompanyBusinessFocus(companyId: Int!, businessFocusId: Int!): Int!
  deleteCompanyBusinessFocus(companyId: Int!, businessFocusId: Int!): Int!
  
  castVote(crowdsourcedResearchId: Int!, personId: Int!, voteType: String!): Int!
  changeVote(crowdsourcedResearchId: Int!, personId: Int!, voteType: String!): Int!
  withdrawVote(crowdsourcedResearchId: Int!, personId: Int!): Int!

  insertBusinessFocus(description: String!): Int!
  updateBusinessFocus(id: Int!, description: String!): Int!
  deleteBusinessFocus(id: Int!): Int!

  insertOwnershipType(description: String!): Int!
  updateOwnershipType(id: Int!, description: String!): Int!
  deleteOwnershipType(id: Int!): Int!
  updatePersonActive(id: Int!, isActive: Boolean!): Int!
  deletePerson(personId: Int!): Int!
  }
    
`);

module.exports = schema;
