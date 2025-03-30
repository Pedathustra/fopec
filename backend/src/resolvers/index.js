const { sql, dbConfig } = require('../config/db');

const resolvers = {
  getCrowdsourcedResearch: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getCrowdsourcedResearch');

      return result.recordset.map(row => ({
        crowdsourced_id: row.crowdsourced_id,
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
  },
  deleteCrowdsourcedResearch: async ({ id }) => {
    try {
      let pool = await sql.connect(dbConfig)
      await pool.request()
        .input('crowdsourced_research_id', sql.Int, id)
        .execute('delCrowdsourcedResearch')

      return true
    } catch (err) {
      console.error('Delete failed:', err)
      return false
    }
  },
  getCompanies: async () => {
    try{
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getCompanies');

      return result.recordset.map(row => ({
        id: row.crowdsourced_id,
        name: row.name,
        created: row.created,
        last_updated: row.last_updated,
      }));
    }
    catch(error){
      console.error('Error executing stored procedure getCompanies', error)
      return false;
    }

  }
};

module.exports = resolvers;
