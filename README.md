#  Task API

A simple RESTful API for managing tasks using **Express.js** and **Prisma ORM**. This API supports basic CRUD operations and is connected to a PostgreSQL database (such as one hosted on Render).

##  Features

- ✅ Create new tasks
- 📥 Retrieve all tasks (excluding deleted)
- 🔍 Get a task by ID
- ✏️ Update a task
- 🗑️ Soft delete a task (`isDeleted = true`)
- 🛡️ Graceful error handling

##  Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (hosted on Render or locally)

---

## 📁Project Structure

.
├── index.js # Entry point
├── prisma/
│ ├── schema.prisma 
├── package.json


---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task_api.git
cd task_api
```
 ## Install dependencies
```bash 
npm install
```

## set prisma
```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## create model

```
model Task {
  id          String   @id @default(uuid())
  title       String
  description String
  isCompleted Boolean
  isDeleted   Boolean
}
```
## Apply the migration and generate Prisma client

```
npx prisma migrate dev --name init
npx prisma generate
```
## start server
```
npm run dev
```


