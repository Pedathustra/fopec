const { sql, dbConfig, jwtSecret } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
  createCrowdsourcedResearch: async ({
    companyId,
    ownershipTypeId,
    observingPersonId,
    notes,
    parentCompanyId,
  }) => {
    console.log('parentCompanyId', parentCompanyId);
    try {
      let pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .input('ownership_type_id', sql.Int, ownershipTypeId)
        .input('observing_person_id', sql.Int, observingPersonId)
        .input('notes', sql.VarChar(sql.MAX), notes)
        .input('parent_company_id', sql.Int, parentCompanyId)
        .execute('insCrowdsourcedResearch');

      return true;
    } catch (error) {
      console.error('Insert failed:', error);
      return false;
    }
  },
  getCrowdsourcedResearch: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getCrowdsourcedResearch');

      return result.recordset.map((row) => ({
        crowdsourcedId: row.crowdsourced_id,
        companyId: row.company_id,
        companyName: row.company_name,
        parentCompanyId: row.parent_company_id,
        parentCompanyName: row.parent_company_name,
        ownershipTypeId: row.ownership_type_id,
        ownershipTypeDescription: row.ownership_type_description,
        username: row.username,
        created: row.created,
        notes: row.notes,
      }));
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      throw new Error('Failed to fetch research data');
    }
  },
  getCrowdsourcedResearchByPersonId: async ({ personId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool
        .request()
        .input('person_id', sql.Int, personId)
        .execute('getCrowdsourcedResearchByPersonId');

      return result.recordset.map((row) => ({
        crowdsourcedId: row.crowdsourced_id,
        companyId: row.company_id,
        companyName: row.company_name,
        parentCompanyId: row.parent_company_id,
        parentCompanyName: row.parent_company_name,
        ownershipTypeId: row.ownership_type_id,
        ownershipTypeDescription: row.ownership_type_description,
        username: row.username,
        created: row.created,
        notes: row.notes,
      }));
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      throw new Error('Failed to fetch research data');
    }
  },
  deleteCrowdsourcedResearch: async ({ id }) => {
    try {
      let pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input('crowdsourced_research_id', sql.Int, id)
        .execute('delCrowdsourcedResearch');

      return true;
    } catch (err) {
      console.error('Delete failed:', err);
      return false;
    }
  },
  getCompanies: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getCompanies');

      return result.recordset.map((row) => ({
        id: row.id,
        name: row.name,
        created: row.created,
        lastUpdated: row.last_updated,
        personIdCreated: row.person_id_created,
      }));
    } catch (error) {
      console.error('Error executing stored procedure getCompanies', error);
      return false;
    }
  },
  getCompaniesByPersonId: async ({ personId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool
        .request()
        .input('person_id_created', sql.Int, personId)
        .execute('getCompaniesByPersonCreatedID');
      console.log('result', result);
      return result.recordset.map((row) => ({
        id: row.id,
        name: row.name,
        created: row.created,
        lastUpdated: row.last_updated,
        personIdCreated: row.person_id_created,
      }));
    } catch (err) {
      console.error('Error executing getCompaniesByPersonCreatedID:', err);
      throw new Error('Failed to fetch companies by person');
    }
  },
  getOwnershipTypes: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getOwnershipTypes');
      return result.recordset.map((row) => ({
        id: row.id,
        description: row.description,
      }));
    } catch (error) {
      console.error(
        'Error executing stored procedure getOwnershipTypes',
        error
      );
      return false;
    }
  },
  updateCrowdsourcedResearch: async ({
    id,
    ownershipTypeId,
    notes,
    parentCompanyId,
  }) => {
    try {
      let pool = await sql.connect(dbConfig);
      await pool
        .request()
        .input('crowdsourced_research_id', sql.Int, id)
        .input('ownership_type_id', sql.Int, ownershipTypeId)
        .input('notes', sql.VarChar(sql.MAX), notes)
        .input('parent_company_id', sql.Int(sql.Int), parentCompanyId)
        .execute('updCrowdsourcedResearch');

      return true;
    } catch (error) {
      console.error('Update failed:', error);
      return false;
    }
  },
  createPerson: async ({
    firstName,
    lastName,
    middleName,
    username,
    password,
  }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const buffer = Buffer.from(hashedPassword);
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('first_name', sql.VarChar(255), firstName)
        .input('last_name', sql.VarChar(255), lastName)
        .input('middle_name', sql.VarChar(255), middleName || '')
        .input('username', sql.VarChar(255), username)
        .input('password', sql.VarBinary(sql.MAX), buffer)
        .execute('insPerson');

      if (result.returnValue === -1) {
        return { success: false, error: 'Username already exists' };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Internal server error' };
    }
  },
  login: async ({ username, password }) => {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('username', sql.VarChar(255), username)
        .execute('loginPerson');

      const user = result.recordset[0];

      if (!user) {
        return {
          success: false,
          error: 'Invalid username or password',
          token: null,
        };
      }

      if (!user.is_active) {
        return { success: false, error: 'Account is inactive', token: null };
      }

      const hashedPassword = user.password.toString();
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        return {
          success: false,
          error: 'Invalid username or password',
          token: null,
        };
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        jwtSecret,
        { expiresIn: '24h' } // TODO: add refresh token later & shorten this
      );

      return { success: true, error: null, token };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Internal server error', token: null };
    }
  },
  updatePerson: async ({
    id,
    firstName,
    lastName,
    middleName,
    username,
    password,
    isActive = true,
  }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const buffer = Buffer.from(hashedPassword);

      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('first_name', sql.VarChar(255), firstName)
        .input('last_name', sql.VarChar(255), lastName)
        .input('middle_name', sql.VarChar(255), middleName || '')
        .input('username', sql.VarChar(255), username)
        .input('password', sql.VarBinary(sql.MAX), buffer)
        .input('is_active', sql.Bit, isActive ? 1 : 0)
        .execute('updPerson');

      if (result.returnValue === -1) {
        return { success: false, error: 'Username already exists' };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error('Update error:', err);
      return { success: false, error: 'Internal server error' };
    }
  },
  getPerson: async ({ id }) => {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .execute('getPerson');

      const person = result.recordset[0];
      if (!person) return null;

      return {
        id: person.id,
        firstName: person.first_name,
        lastName: person.last_name,
        middleName: person.middle_name,
        username: person.username,
        isActive: person.is_active,
      };
    } catch (err) {
      console.error('Error fetching person:', err);
      return null;
    }
  },
  insertAddress: async ({ line1, line2, city, state, zip }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const request = pool.request();

      request
        .input('line1', sql.VarChar(255), line1)
        .input('line2', sql.VarChar(255), line2)
        .input('city', sql.VarChar(255), city)
        .input('state', sql.VarChar(255), state)
        .input('zip', sql.VarChar(255), zip);

      const result = await request.execute('insAddress');
      return result.returnValue;
    } catch (err) {
      console.error('Error executing insAddress:', err);
      throw new Error('Insert failed');
    }
  },

  updateAddress: async ({ id, line1, line2, city, state, zip }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const request = pool.request();

      request
        .input('id', sql.Int, id)
        .input('line1', sql.VarChar(255), line1)
        .input('line2', sql.VarChar(255), line2)
        .input('city', sql.VarChar(255), city)
        .input('state', sql.VarChar(255), state)
        .input('zip', sql.VarChar(255), zip);

      const result = await request.execute('updAddress');
      return result.returnValue;
    } catch (err) {
      console.error('Error executing updAddress:', err);
      throw new Error('Update failed');
    }
  },
  deleteAddress: async ({ id }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const request = pool.request();

      request.input('id', sql.Int, id);

      const result = await request.execute('delAddress');
      return result.returnValue;
    } catch (err) {
      console.error('Error executing delAddress:', err);
      throw new Error('Delete failed');
    }
  },
  getAddresses: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      let result = await pool.request().execute('getAddresses');

      return result.recordset.map((row) => ({
        id: row.id,
        line1: row.line1,
        line2: row.line2,
        city: row.city,
        state: row.state,
        zip: row.zip,
      }));
    } catch (error) {
      console.error('Error executing getAddresses:', error);
      throw new Error('Failed to fetch address data');
    }
  },
  insertCompany: async ({ name, personIdCreated }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const request = pool.request();

      request
        .input('name', sql.VarChar(255), name)
        .input('person_id_created', sql.Int, personIdCreated);

      const result = await request.execute('insCompany');
      return result.returnValue;
    } catch (err) {
      console.error('Error inserting company:', err);
      throw new Error('Insert failed');
    }
  },
  updateCompany: async ({ id, name }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const request = pool.request();

      request.input('id', sql.Int, id).input('name', sql.VarChar(255), name);

      const result = await request.execute('updCompany');
      return result.returnValue;
    } catch (err) {
      console.error('Error updating company:', err);
      throw new Error('Update failed');
    }
  },
  deleteCompany: async ({ id }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const request = pool.request();

      request.input('id', sql.Int, id);

      const result = await request.execute('delCompany');
      return result.returnValue;
    } catch (err) {
      console.error('Error deleting company:', err);
      throw new Error('Delete failed');
    }
  },
  getAddressesByCompanyId: async ({ companyId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('companyId', sql.Int, companyId)
        .execute('getAddressesByCompanyId');

      return result.recordset.map((row) => ({
        id: row.id,
        line1: row.line1,
        line2: row.line2,
        city: row.city,
        state: row.state,
        zip: row.zip,
        isHQ: row.isHQ,
      }));
    } catch (err) {
      console.error('Error fetching company addresses:', err);
      throw new Error('Failed to fetch addresses');
    }
  },
  addCompanyAddress: async ({ companyId, addressId, isHQ }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .input('address_id', sql.Int, addressId)
        .input('isHQ', sql.Bit, isHQ)
        .execute('insCompanyLocation');

      return result.returnValue;
    } catch (err) {
      console.error('Error adding address to company:', err);
      throw new Error('Add failed');
    }
  },
  deleteCompanyAddress: async ({ companyId, addressId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .input('address_id', sql.Int, addressId)
        .execute('delCompanyLocation');

      return result.returnValue;
    } catch (err) {
      console.error('Error deleting company address:', err);
      throw new Error('Delete failed');
    }
  },
  getBusinessFocuses: async ({ companyId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool.request().execute('getBusinessFocuses');

      return result.recordset;
    } catch (err) {
      console.error('Error fetching business focuses:', err);
      throw new Error('Failed to fetch business focuses');
    }
  },
  getBusinessFocusesByCompanyId: async ({ companyId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .execute('getBusinessFocusesByCompanyId');

      return result.recordset;
    } catch (err) {
      console.error('Error fetching business focuses:', err);
      throw new Error('Failed to fetch business focuses');
    }
  },
  addCompanyBusinessFocus: async ({ companyId, businessFocusId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .input('business_focus_id', sql.Int, businessFocusId)
        .execute('insCompanyBusinessFocus');

      return result.returnValue;
    } catch (err) {
      console.error('Error adding business focus to company:', err);
      throw new Error('Add failed');
    }
  },
  deleteCompanyBusinessFocus: async ({ companyId, businessFocusId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .input('business_focus_id', sql.Int, businessFocusId)
        .execute('delCompanyBusinessFocus');

      return result.returnValue;
    } catch (err) {
      console.error('Error deleting business focus from company:', err);
      throw new Error('Delete failed');
    }
  },
  updateCompanyLocation: async ({ companyId, addressId, isHQ }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('company_id', sql.Int, companyId)
        .input('address_id', sql.Int, addressId)
        .input('isHQ', sql.Bit, isHQ)
        .execute('updCompanyLocation');

      return result.returnValue;
    } catch (err) {
      console.error('Error updating isHQ flag for company address:', err);
      throw new Error('Update failed');
    }
  },
  getVotes: async ({ observerPersonId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('observer_person_id', sql.Int, observerPersonId)
        .execute('getVotes');

      return result.recordset.map((row) => ({
        companyName: row.company_name,
        ownershipTypeDescription: row.ownership_type_description,
        parentCompanyName: row.parent_company_name,
        id: row.id,
        notes: row.notes,
        observer: row.observer,
        observerId: row.observer_id,
        upCount: row.up_count,
        downCount: row.down_count,
      }));
    } catch (err) {
      console.error('Error fetching votes:', err);
      throw new Error('Failed to fetch votes');
    }
  },
  castVote: async ({ crowdsourcedResearchId, personId, voteType }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('crowdsourced_research_id', sql.Int, crowdsourcedResearchId)
        .input('person_id', sql.Int, personId)
        .input('vote_type', sql.VarChar(100), voteType)
        .execute('insVote');

      return result.returnValue;
    } catch (err) {
      console.error('Error casting vote:', err);
      throw new Error('Vote failed');
    }
  },

  changeVote: async ({ crowdsourcedResearchId, personId, voteType }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('crowdsourced_research_id', sql.Int, crowdsourcedResearchId)
        .input('person_id', sql.Int, personId)
        .input('vote_type', sql.VarChar(100), voteType)
        .execute('updVote');

      return result.returnValue;
    } catch (err) {
      console.error('Error changing vote:', err);
      throw new Error('Change vote failed');
    }
  },

  withdrawVote: async ({ crowdsourcedResearchId, personId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('crowdsourced_research_id', sql.Int, crowdsourcedResearchId)
        .input('person_id', sql.Int, personId)
        .execute('delVote');

      return result.returnValue;
    } catch (err) {
      console.error('Error withdrawing vote:', err);
      throw new Error('Withdraw vote failed');
    }
  },
  getPersons: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool.request().execute('getPersons');

      return result.recordset.map((row) => ({
        id: row.id,
        username: row.username,
        firstName: row.first_name,
        lastName: row.last_name,
      }));
    } catch (err) {
      console.error('Error fetching persons:', err);
      throw new Error('Failed to fetch persons');
    }
  },
  getPersonAuditById: async ({ personId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool.request().input('id', sql.Int, personId).query(`
          select 
            first_name,
            last_name,
            middle_name,
            username,
            created_date,
            updated_date,
            is_active,
            record_type,
            idx
          from vPersonAudit
          where id = @id
          order by idx
        `);

      return result.recordset.map((row) => ({
        firstName: row.first_name,
        lastName: row.last_name,
        middleName: row.middle_name,
        username: row.username,
        createdDate: row.created_date,
        updatedDate: row.updated_date,
        isActive: row.is_active,
        recordType: row.record_type,
        idx: row.idx,
      }));
    } catch (err) {
      console.error('Error fetching person audit:', err);
      throw new Error('Failed to fetch audit data');
    }
  },
  insertBusinessFocus: async ({ description }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('description', sql.VarChar(255), description)
        .execute('insBusinessFocus');

      return result.returnValue;
    } catch (err) {
      console.error('Error inserting business focus:', err);
      throw new Error('Insert failed');
    }
  },
  updateBusinessFocus: async ({ id, description }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('description', sql.VarChar(255), description)
        .execute('updBusinessFocus');

      return result.returnValue;
    } catch (err) {
      console.error('Error updating business focus:', err);
      throw new Error('Update failed');
    }
  },
  deleteBusinessFocus: async ({ id }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .execute('delBusinessFocus');

      return result.returnValue;
    } catch (err) {
      console.error('Error deleting business focus:', err);
      throw new Error('Delete failed');
    }
  },
  insertOwnershipType: async ({ description }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('description', sql.VarChar(255), description)
        .execute('insOwnershipType');
      return result.returnValue;
    } catch (err) {
      console.error('Error inserting ownership type:', err);
      throw new Error('Insert failed');
    }
  },

  updateOwnershipType: async ({ id, description }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('description', sql.VarChar(255), description)
        .execute('updOwnershipType');
      return result.returnValue;
    } catch (err) {
      console.error('Error updating ownership type:', err);
      throw new Error('Update failed');
    }
  },

  deleteOwnershipType: async ({ id }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .execute('delOwnershipType');
      return result.returnValue;
    } catch (err) {
      console.error('Error deleting ownership type:', err);
      throw new Error('Delete failed');
    }
  },
  getPersonActivity: async ({ nameDisplayType }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('name_display_type', sql.TinyInt, nameDisplayType)
        .execute('getPersonActivity');

      return result.recordset.map((row) => ({
        id: row.id,
        displayName: row.display_name,
        isActive: row.is_active,
        auditRecords: row.audit_records,
        companyRecords: row.company_records,
        crowdsourcedResearchRecords: row.crowdsourced_research_records,
        voteRecords: row.vote_records,
      }));
    } catch (err) {
      console.error('Error fetching person activity:', err);
      throw new Error('Failed to retrieve person activity');
    }
  },
  deletePerson: async ({ personId }) => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('person_id', sql.Int, personId)
        .execute('delPerson');

      return result.returnValue;
    } catch (err) {
      console.error('Error deleting person:', err);
      throw new Error('Delete failed');
    }
  },
  updatePersonActive: async ({ id, isActive }) => {
    try {
      console.log('id', id);
      let pool = await sql.connect(dbConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('is_active', sql.Bit, isActive)
        .execute('updPersonActive');
      console.log('result', result);
      return result.returnValue;
    } catch (err) {
      console.error('Error updating person activity status:', err);
      throw new Error('Update isActive failed');
    }
  },
  getDatabaseObjectCounts: async () => {
    try {
      let pool = await sql.connect(dbConfig);
      const result = await pool.request().execute('getDatabaseObjectCounts');
      const row = result.recordset[0];

      return {
        tableCount: row.table_count,
        viewCount: row.view_count,
        procedureCount: row.procedure_count,
        functionCount: row.function_count,
        triggerCount: row.trigger_count,
      };
    } catch (err) {
      console.error('Error fetching database object counts:', err);
      throw new Error('Failed to fetch object counts');
    }
  },
};

module.exports = resolvers;
