const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type ResearchItem {
    crowdsourced_id: Int
    name: String
    description: String
    username: String
    created: String
    notes: String
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
    ): Boolean
    createCrowdsourcedResearch(
      companyId: Int!
      ownershipTypeId: Int!
      observingPersonId: Int!
      notes: String!
  ): Boolean
  }
`);

module.exports = schema;
