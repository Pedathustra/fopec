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

  type Query {
    getCrowdsourcedResearch: [ResearchItem]
    getCompanies: [Company]
  }

    type Mutation {
    deleteCrowdsourcedResearch(id: Int!): Boolean
  }
`);

module.exports = schema;
