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

  type Query {
    getCrowdsourcedResearch: [ResearchItem]
  }

    type Mutation {
    deleteCrowdsourcedResearch(id: Int!): Boolean
  }
`);

module.exports = schema;
