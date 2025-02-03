# Depo IQ

**Depo IQ** is a full-stack application for managing topics and tags, built with modern technologies for scalability, security, and performance. The application interacts with MongoDB for data persistence and Redis for caching.

## Features

- **Full-stack application**: React.js client and Node.js server.
- **GraphQL API**: Efficient data management and querying.
- **Mongoose Encryption**: Secure and encrypted data storage.
- **Redis Caching**: Optimized performance for frequently accessed data.
- **Ant Design & TailwindCSS**: Beautiful and responsive UI.
- **Authentication**: User authentication powered by Clerk.
- **Logging**: Integrated with Datadog for client-side logs.
- **Search Functionality**: Implemented search across topics and tags.

---

## Project Structure

```
depo-iq/
├── client/          # React-based frontend
├── server/          # Node.js and GraphQL backend
└── README.md        # Main project documentation
```

---

## Prerequisites

- **Node.js** >= 18.x
- **MongoDB** (Local or Cloud Instance)
- **Redis** (Local or Cloud Instance)

---

## Setup and Run Instructions

### Clone the Repository

```bash
git clone https://github.com/DaudSamim1/DepoIQ-test.git
cd DepoIQ-test
```

### Install Dependencies

```bash
npm run install:all
```

### Start the Application

```bash
npm run dev
```

This will start both the frontend and backend simultaneously.

### Build the Application

```bash
npm run build
```

### Start the Production Server

```bash
npm run start
```

---

## Environment Variables

### Server `.env`

```env
# App
NODE_ENV=development
HOSTNAME=127.0.0.1
PORT=4000

# Database
MONGO_URL=mongodb://127.0.0.1:27017/development?authSource=admin
MONGO_ENCRYPTION_KEY="encryptionKey"

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_cmVsZXZhbnQtbGxhbWEtOTQuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_a8hPJQWd85LwazllnY3ZDyzuA2cOrAlNn3LEcNJJM9

# DataDog Logging
DATADOG_API_KEY=3cc621f99726d57b723f3b1d0fbf667e
DATADOG_SITE=us5.datadoghq.com
```

### Client `.env`

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cmVsZXZhbnQtbGxhbWEtOTQuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_DATADOG_CLIENT_TOKEN=pub923bb81d15dc0ac14ecef9a1f626cf63
VITE_DATADOG_SITE=us5.datadoghq.com
VITE_ENV=development
```

---

## User Credentials

Use the following credentials to log in as a test user:

```
Email: test@user.com
Username: test_user
Password: 6KT9cPZVnwcdCL8
```

---

## API Endpoints

### GraphQL Playground

- Access the API via GraphQL Playground at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## Scripts

```json
"scripts": {
  "install:all": "cd server && npm install && cd ../client && npm install",
  "dev": "cd ./server && npm run dev & cd ./client && npm run dev",
  "build": "cd ./server && npm run build && cd ./client && npm run build",
  "start": "cd ./server && npm run start"
}
```

- **dev**: Runs both client and server in development mode.
- **build**: Builds both client and server for production.
- **start**: Starts the application in production mode.

---

## Technologies Used

### Backend

- **Node.js** with **Express.js**
- **GraphQL** via Apollo Server
- **MongoDB** with Mongoose ORM
- **Mongoose Encryption** for secure data storage
- **Redis** for caching

### Frontend

- **React.js** with Vite
- **Apollo Client** for GraphQL
- **Ant Design & TailwindCSS** for UI
- **Clerk Authentication**
- **Datadog Browser Logs**

---

## Video Demonstrations

- **Test-Task Part 1 - Client Side**: [Watch Here](https://www.loom.com/share/6f07793e54b743a996ade24abf9595cc?sid=64bc78c3-73c7-42d6-8525-02b3eeeb9954)
- **Test-Task Part 2 - Server Side**: [Watch Here](https://www.loom.com/share/72c369a5f5b742f6835e674e2da5feef?sid=36fbba42-e127-4e8d-9e3a-7a24387818ed)
- **Test-Task Part 3 - Website Overview**: [Watch Here](https://www.loom.com/share/0bd6fa40769d43d68eaf9d5ca675bbe3?sid=770a32f3-3040-4036-8a59-e3e6df8af172)
