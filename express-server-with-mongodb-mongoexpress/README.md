# Express Server with MongoDB + Mongo Express

A simple Express API with MongoDB (via Mongoose) and Mongo Express for DB admin.

## Features
- REST API for users (CRUD)
- MongoDB persistence
- Mongo Express web UI
- Dockerized setup

## Stack
- Node.js + Express
- Mongoose
- MongoDB
- Mongo Express
- Docker + Docker Compose

## Project Structure
```
.
├── app.js
├── Dockerfile
├── docker-compose.yml
├── package.json
└── package-lock.json
```

## Requirements
- Docker
- Docker Compose

## Quick Start

```bash
docker-compose up --build
```

Services:
- App: http://localhost:3000
- Mongo Express: http://localhost:8081

## Environment Variables

The app supports:
- MONGO_URI (optional)
  Default: mongodb://admin:admin@mongodb:27017/userdb?authSource=admin
- PORT (optional)
  Default: 3000

MongoDB root user:
- username: admin
- password: admin

## API Endpoints

### Health
- GET /
  Returns: User Management API

### Users
- POST /users
  Create a user
  Body:
  ```json
  { "name": "Bala", "email": "balais@gay.com", "age": 69 }
  ```

- GET /users
  List users (supports query filters)
  Query params: name, email

- GET /users/:id
  Get user by ID

- PUT /users/:id
  Update user by ID
  Body: any user fields

- DELETE /users/:id
  Delete user by ID

## Example cURL

Create user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bala","email":"balais@gay.com","age":69}'
```

List users:
```bash
curl http://localhost:3000/users
```

## Notes
- Inside Docker, the app connects to MongoDB using the service name mongodb.
- Mongo Express connects to mongodb:27017.

## Stop & Clean

```bash
docker-compose down -v
```
