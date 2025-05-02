# FOPEC – Ferret Out Private Equity Companies

## Use Case

Private equity firms are increasingly acquiring small businesses—often cutting staff, narrowing services to maximize profit, and ultimately reducing service quality. This trend has had a particularly negative impact on sectors like healthcare and veterinary care.

This project is the foundation of an application that empowers consumers to identify and flag businesses owned by private equity. Users can contribute records that describe a company’s ownership type (e.g., sole proprietorship, LLC, private equity), and other users can upvote or downvote these records to crowdsource visibility and improve accuracy. The goal is to help consumers make more informed decisions about where they spend their money.

## Architecture

This application follows a three-tier architecture:

    Database: Microsoft SQL Server

    Backend: Node.js with TypeScript and GraphQL

    Frontend: React with TypeScript, communicating with the backend via GraphQL

## ER Diagram

[![ER Diagram](../database/DataDiagram.png)](../database/DataDiagram.png)

## Normalization

This database is designed in Third Normal Form (3NF), ensuring that all non-key attributes are functionally dependent only on the primary key. Junction tables are used to resolve many-to-many relationships (e.g., company/business focus), and no repeating groups or transitive dependencies exist.

## Transaction Isolation

SQL Server’s default isolation level, READ COMMITTED, is used throughout the application. This level prevents dirty reads and is appropriate for this project due to the nature of the workload:

    Most transactions are lightweight and user-specific, such as voting or submitting company records. These do not generate significant contention and don’t require stricter isolation.

    There are no bulk read/write operations, with one exception: deleting a user (person) can involve multiple updates or deletes across related tables. However, this operation is controlled and infrequent, and referential updates are managed safely using an INSTEAD OF DELETE trigger.

As such, no explicit changes to the isolation level were necessary.
