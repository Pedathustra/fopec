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
type UpdatePersonResult {
  success: Boolean!
  error: String
}
type Query {
    getAddresses: [Address!]!
    getAddressesByCompanyId(companyId: Int!): [Address!]!
    getBusinessFocuses: [BusinessFocus!]!
    getBusinessFocusesByCompanyId(companyId: Int!): [BusinessFocus!]!
    getCrowdsourcedResearch: [ResearchItem]
    getCompanies: [Company]
    getCompaniesByPersonId(personId: Int!): [Company!]!
    getOwnershipTypes: [OwnershipTypes]
    getPerson(id: Int!): Person
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
  }
    
`);

module.exports = schema;
