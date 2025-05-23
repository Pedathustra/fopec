require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const rootValue = require('./resolvers');

const app = express();
app.use(cors()) 
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));


app.get('/', (req, res) => {
    res.send('FOPEC backend is running. Use /graphql to query.');
  });

module.exports = app;
