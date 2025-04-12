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
type RegisterResult {
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
  registerPerson(
    first_name: String!
    last_name: String!
    middle_name: String
    username: String!
    password: String!
  ): RegisterResult!
  }
`);

module.exports = schema;
 

