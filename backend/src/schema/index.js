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
  

type UpdatePersonResult {
  success: Boolean!
  error: String
}

  type Query {
    getCrowdsourcedResearch: [ResearchItem]
    getCompanies: [Company]
    getOwnershipTypes: [OwnershipTypes]
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
  }
    
`);

module.exports = schema;
 

