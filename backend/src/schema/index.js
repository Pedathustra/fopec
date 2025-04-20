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
}

input AddressInput {
  line1: String!
  line2: String
  city: String!
  state: String!
  zip: String!
}   
type CreatePersonResult {
  success: Boolean!
  error: String
}
type Company {
    id: Int
    name: String
    created: String
    last_updated: String
  }

type OwnershipTypes{
    id: Int
    description: String  
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
    getCrowdsourcedResearch: [ResearchItem]
    getCompanies: [Company]
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
  }
    
`);

module.exports = schema;
