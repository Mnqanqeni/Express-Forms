````md
# How to Run the Application

## Table of Contents

1. [Introduction](#introduction)
2. [Instruction (Quick Summary)](#instruction-quick-summary)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Accessing the Application](#accessing-the-application)
8. [Accessing the Database through Adminer](#accessing-the-database-through-adminer)

## Introduction

This document provides step-by-step instructions for running the Express forms and templates project. The application allows visitors to add their details to the database.

---

## Instruction (Quick Summary)

1. **Clone the repository**:

   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file with database settings.

4. **Run PostgreSQL and Adminer**:

   ```bash
   docker-compose up
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

6. **Access the application**:
   Visit `http://localhost:5001/new_visitor`.

7. **Access the database**:
   Visit `http://localhost:8080` using PostgreSQL credentials.

---

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- **Node.js** (version 20.16.0 or later)
- **npm** (Node Package Manager, usually included with Node.js)
- **Git** (optional, for cloning the repository)
- **Docker** (for running PostgreSQL and Adminer using Docker Compose)

## Installation

1. **Clone the Repository** (if applicable):

   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Install Dependencies:** Navigate to the application directory and run the following command:
   ```bash
   npm install
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory of the project. Fill in the necessary configurations:

```env
POSTGRES_USER=user
POSTGRES_HOST=localhost
POSTGRES_DB=db
POSTGRES_PASSWORD=pass
POSTGRES_PORT=5432
EXPRESS_PORT=5001
```

### Database Setup

To start the PostgreSQL and Adminer containers, run the following command:

```bash
docker-compose up
```

## Running the Application

### Start the Server

Use the following command to start the application:

```bash
npm start
```

Alternatively, to run in development mode:

```bash
npm run dev
```

## Accessing the Application

Open your web browser and navigate to:

```
http://localhost:5001/new_visitor
```

## Accessing the Database through Adminer

To access the Adminer interface, navigate to:

```
http://localhost:8080
```

When logging in to Adminer, use the following details (assuming you used the provided default settings). If you changed the environment variables in the `.env` file, make sure the credentials match:

- **System**: PostgreSQL
- **Server**: `localhost`
- **Username**: `user`
- **Password**: `pass`
- **Database**: `db`
````
