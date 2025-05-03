# FOPEC – Ferret Out Private Equity Companies

## Use Case

Private equity firms are increasingly acquiring small businesses—often cutting staff, narrowing services to maximize profit, and ultimately reducing service quality. This trend has had a particularly negative impact on sectors like healthcare and veterinary care.

This project is the foundation of an application that empowers consumers to identify and flag businesses owned by private equity. Users can contribute records that describe a company’s ownership type (e.g., sole proprietorship, LLC, private equity), and other users can upvote or downvote these records to crowdsource visibility and improve accuracy. The goal is to help consumers make more informed decisions about where they spend their money.

## Architecture

This application follows a three-tier architecture:

- **Database**: Microsoft SQL Server
- **Backend**: Node.js with TypeScript and GraphQL
- **Frontend**: React with TypeScript, communicating with the backend via GraphQL

## ER Diagram

[![ER Diagram](../database/DataDiagram.png)](../database/DataDiagram.png)

## Normalization

This database is normalized to **Boyce-Codd Normal Form (BCNF)**.

- All non-key columns are directly dependent on their table’s primary key, satisfying **3NF**
- No transitive dependencies or redundant attributes exist
- Junction tables (e.g., `company_business_focus`, `company_location`) rely on composite candidate keys and have no partial dependencies
- All determinants are candidate keys, satisfying **BCNF**

Lookup values (e.g., `ownership_type`, `business_focus`) are normalized into separate reference tables and linked by foreign keys.

## Transaction Isolation

SQL Server’s default isolation level, READ COMMITTED, is used throughout the application. This level prevents dirty reads and is appropriate for this project due to the nature of the workload:

- Most transactions are lightweight and user-specific, such as voting or submitting company records. These do not generate significant contention and don’t require stricter isolation.

- There are no bulk read/write operations, with one exception: deleting a user (`person`) can involve multiple updates or deletes across related tables. However, this operation is controlled and infrequent, and referential updates are managed safely using an `INSTEAD OF DELETE` trigger.

As such, no explicit changes to the isolation level were necessary.

## Integrity Enforcement

Data integrity is maintained through a combination of primary key, foreign key, check constraints, and triggers:

Foreign key relationships enforce referential integrity across tables. For example, reference (lookup) tables like business_focus and ownership_type constrain valid entries in company_business_focus and crowdsourced_research.

The address table also acts as a reference table, linked to companies via the company_location junction table.

A check constraint on the crowdsourced_research_vote table enforces valid domain values by limiting the vote_type column to 'up' or 'down'.

Triggers provide additional logical enforcement:

- trg_insteadOfDelete_person: preserves referential integrity when a person is hard-deleted by redirecting related rows to a placeholder "deleted" record.

- trg_person_audit: ensures an audit trail by inserting a snapshot of user data into person_audit upon profile update.

These mechanisms collectively safeguard the consistency, accuracy, and traceability of data within the application.

## Authentication & Sessions

User authentication is handled through a JWT-based login flow. The application includes:

- A loginPerson stored procedure that validates the user’s credentials against the person_login table

- On successful login, a JSON Web Token (JWT) is returned to the client and stored locally

- The frontend attaches this token as a bearer header to all GraphQL requests, enabling authenticated session tracking

Session-aware operations include:

- Displaying activity reports specific to the logged-in user

- Restricting votes so that a user cannot vote on their own submissions

- Associating new submissions (e.g., companies, votes) with the current user’s ID

This setup enables stateless session management and secure identity propagation throughout the system without relying on traditional server-side session storage.

## Folder Strucutre

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── resolvers
│   │   └── schema
├── database
│   ├── backups
│   ├── DataDiagram.png
│   └── fopec_database
│       ├── build_database_objects.sql
│       └── fopec_database.ssmssln
├── frontend
│   ├── public
│   └── src
│       ├── components
│       ├── graphql
│       ├── hooks
│       ├── types
│       └── utils
```

## CRUD Coverage - Stored Procedures / Trigger

All CRUD is enabled by stored procedure or trigger. Trigger functionality denoted by `*`.

| Entity                       | Create (`ins`)            | Read (`get`)                                                                          | Update (`upd`)                 | Delete (`del`)            |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------- | ------------------------------ | ------------------------- |
| `person`                     | `insPerson`               | `getPerson`, `getPersons`,`getPersonActivity` ,`getPersonPasswordById`, `loginPerson` | `updPerson`, `updPersonActive` | `delPerson`               |
| `person_audit`               | `trg_person_audit* `      | `getPersonActivity`                                                                   | `updPersonAudit`               | `delPersonAudit`          |
| `address`                    | `insAddress`              | `getAddresses`, `getAddressesByCompanyId`                                             | `updAddress`                   | `delAddress`              |
| `company`                    | `insCompany`              | `getCompanies`, `getCompaniesByPersonID`                                              | `updCompany`                   | `delCompany`              |
| `business_focus`             | `insBusinessFocus`        | `getBusinessFocuses`, `getBusinessFocusesByCompanyId`                                 | `updBusinessFocus`             | `delBusinessFocus`        |
| `ownership_type`             | `insOwnershipType`        | `getOwnershipTypes`                                                                   | `updOwnershipType`             | `delOwnershipType`        |
| `crowdsourced_research`      | `insCrowdsourcedResearch` | `getCrowdsourcedResearch`, `getCrowdsourcedResearchByPersonId`                        | `updCrowdsourcedResearch`      | `delCrowdsourcedResearch` |
| `crowdsourced_research_vote` | `insVote`                 | `getVotes`                                                                            | `updVote`                      | `delVote`                 |
| `company_location`           | `insCompanyLocation`      | `getAddressesByCompanyId`                                                             | `updCompanyLocation`           | `delCompanyLocation`      |
| `company_business_focus`     | `insCompanyBusinessFocus` | `getBusinessFocusesByCompanyId`,`getBusinessFocuses`                                  | `updCompanyBusinessFocus`      | `delCompanyBusinessFocus` |

## Triggers

    `trg_insteadOfDelete_person` – When a person is hard deleted, this trigger updates all foreign-key-dependent rows to reference a placeholder person record with id = 0. It also invokes the updPersonAudit procedure, which appends _DELETED to relevant string fields in the person_audit table. This ensures that referential integrity is preserved and the deletion is traceable.

    `trg_person_audit` – Automatically inserts a record into person_audit whenever a user updates their profile via the Person Profile screen in the UI. This enables historical tracking of profile changes over time.

## Functions

    `fnCountProcedures`, `fnCountTriggers`, `fnCountUserTables`, `fnCountViews`, `fnFunctionsCount` – These scalar functions query SQL Server system tables to return counts of user-defined objects. They are composed into the `vCountDatabaseObjects` view, which powers the `Database Objects` screen.

    `fnFormatPerson` – Used in the Persons screen to dynamically format display names (e.g., Last, First M., Username (First Last), etc.). This supports flexible UX in dropdowns and reports.

## Views

    `vCountDatabaseObjects` – Combines the various object-count functions into a single result set. Called by the `getDatabaseObjectCounts` procedure and displayed in the frontend via the Database Objects report.

    `vVotes` – Joins the vote, company, ownership type, and observer data to show how users have voted on crowdsourced research.

    `vPersonAudit` – A UNION view combining person and person_audit to create a chronological view of each user’s profile changes. Used in the Person Activity screen.

## Reports

    `Database Objects` – Powered by `getDatabaseObjectCounts`, this screen summarizes how many tables, views, stored procedures, functions, and triggers exist in the system. This serves both a reporting purpose and highlights overall schema complexity.

    `Votes` – The Vote screen uses the `getVotes` procedure, which performs a cross-tab style aggregation to show upvotes and downvotes per crowdsourced observation. It includes related company, observer, and ownership type metadata to help users assess the legitimacy of each claim.

    `Persons` – The Persons screen shows per-user counts of records in audit, company, research, and vote tables. Users can be soft-deleted (via is_active = 0) or hard-deleted (via delPerson, which invokes trg_insteadOfDelete_person). This allows for responsible data cleanup with visibility into user activity before deletion.

## Running the Application

- **Database**
  Database backups are available in the `./database/backups` folder. You can restore the latest backup file:
  `./database/backups/20250501_fopec.bak`

- **Backend**

  1. Copy the `.env.example` file from `./backend/.env.example` and rename it to `.env`.
  2. Create a SQL Server login and grant it `sysadmin` privileges (for demo purposes only).
  3. Set a secure JWT secret and update the `.env` file accordingly.
  4. Restore the database and ensure login access is working.
  5. From the project root, run:
     ```bash
     cd backend && npm run dev
     ```

- **Frontend**
  1. Copy the `.env.example` file from `./frontend/.env.example` and rename it to `.env`.
     (No additional config is needed for this file.)
  2. From the project root, run:
     ```bash
     cd frontend && npm run dev
     ```
  3. Open your browser and navigate to:
     [http://localhost:5173](http://localhost:5173)
