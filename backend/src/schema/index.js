const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type ResearchItem {
    name: String
    description: String
    username: String
    created: String
    notes: String
  }

  type Query {
    getCrowdsourcedResearch: [ResearchItem]
  }
`);

module.exports = schema;
