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
- Junction tables (e.g., `company_business_focus`) rely on composite candidate keys and have no partial dependencies
- All determinants are candidate keys, satisfying **BCNF**

Lookup values (e.g., `ownership_type`, `business_focus`) are normalized into separate reference tables and linked by foreign keys.

## Transaction Isolation

SQL Server’s default isolation level, READ COMMITTED, is used throughout the application. This level prevents dirty reads and is appropriate for this project due to the nature of the workload:

- Most transactions are lightweight and user-specific, such as voting or submitting company records. These do not generate significant contention and don’t require stricter isolation.

- There are no bulk read/write operations, with one exception: deleting a user (`person`) can involve multiple updates or deletes across related tables. However, this operation is controlled and infrequent, and referential updates are managed safely using an `INSTEAD OF DELETE` trigger.

As such, no explicit changes to the isolation level were necessary.

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

.
├── backend
│ ├── node_modules – Local backend dependencies
│ ├── package.json – Backend package config
│ ├── server.js – Entry point for the backend server
│ └── src
│ ├── app.js
│ ├── config – Environment and database configs
│ ├── resolvers – GraphQL resolvers mapped to stored procs
│ └── schema – GraphQL type definitions and operations
│
├── database
│ ├── DataDiagram.png – ER diagram
│ ├── backups – SQL Server `.bak` files
│ └── fopec_database
│ ├── build_database_objects.sql
│ ├── fopec_database – Contains stored procedures, views, triggers, functions
│ └── fopec_database.ssmssln – SSMS solution file
│
├── frontend
│ ├── public
│ │ ├── FerretOutLogo.png
│ │ └── favicon.png
│ ├── src
│ │ ├── assets – UI images and icons
│ │ ├── components – React components organized by domain
│ │ ├── graphql – GraphQL query/mutation client code
│ │ ├── hooks – Custom React hooks (e.g. for auth)
│ │ ├── types – Shared TypeScript types
│ │ ├── utils – Frontend utility functions
│ │ ├── App.tsx – Root component
│ │ └── main.tsx – Application entry point
│ ├── index.html
│ ├── package.json
│ ├── tsconfig.json
│ └── vite.config.ts
│
├── README.md
├── package.json – Root-level for tooling or monorepo setup
└── package-lock.json

## CRUD Coverage

| Entity                       | Create (`ins`)            | Read (`get`)                                                   | Update (`upd`)                                   | Delete (`del`)            |
| ---------------------------- | ------------------------- | -------------------------------------------------------------- | ------------------------------------------------ | ------------------------- |
| `person`                     | `insPerson`               | `getPerson`, `getPersons`                                      | `updPerson`, `updPersonActive`, `updPersonAudit` | `delPerson`               |
| `address`                    | `insAddress`              | `getAddresses`, `getAddressesByCompanyId`                      | `updAddress`                                     | `delAddress`              |
| `company`                    | `insCompany`              | `getCompanies`, `getCompaniesByPersonID`                       | `updCompany`                                     | `delCompany`              |
| `business_focus`             | `insBusinessFocus`        | `getBusinessFocuses`, `getBusinessFocusesByCompanyId`          | `updBusinessFocus`                               | `delBusinessFocus`        |
| `ownership_type`             | `insOwnershipType`        | `getOwnershipTypes`                                            | `updOwnershipType`                               | `delOwnershipType`        |
| `crowdsourced_research`      | `insCrowdsourcedResearch` | `getCrowdsourcedResearch`, `getCrowdsourcedResearchByPersonId` | `updCrowdsourcedResearch`                        | `delCrowdsourcedResearch` |
| `crowdsourced_research_vote` | `insVote`                 | `getVotes`                                                     | `updVote`                                        | `delVote`                 |
| `company_location`           | `insCompanyLocation`      | –                                                              | `updCompanyLocation`                             | `delCompanyLocation`      |
| `company_business_focus`     | `insCompanyBusinessFocus` |                                                                | `updCompanyBusinessFocus`                        | `delCompanyBusinessFocus` |
