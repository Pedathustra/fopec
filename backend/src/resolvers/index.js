const { sql, dbConfig } = require('../config/db');

const resolvers = {
  getCrowdsourcedResearch: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getCrowdsourcedResearch');

      return result.recordset.map(row => ({
        name: row.name,
        description: row.description,
        username: row.username,
        created: row.created,
        notes: row.notes
      }));
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      throw new Error('Failed to fetch research data');
    }
  }
};

module.exports = resolvers;
