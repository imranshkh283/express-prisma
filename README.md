# express-prisma-mysql
express-prisma

# Quickstart
In this Quickstart guide, you'll learn how to get started with Prisma from scratch using a plain TypeScript project and a local SQLite database file. It covers data modeling, migrations and querying a database.

If you want to use Prisma with your own PostgreSQL, MySQL, MongoDB or any other supported database, go here instead:

# 1. Create TypeScript project and set up Prisma
As a first step, create a project directory and navigate into it:

mkdir hello-prisma
cd hello-prisma

Next, initialize a TypeScript project using npm:

npm init -y 
npm install typescript ts-node @types/node --save-dev 

This creates a package.json with an initial setup for your TypeScript app.

Now, initialize TypeScript:
npx tsc --init

Then, install the Prisma CLI as a development dependency in the project:
npm install prisma --save-dev 

Finally, set up Prisma with the init command of the Prisma CLI:
npx prisma init --datasource-provider sqlite

This creates a new prisma directory with your Prisma schema file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.

# 2. Model your data in the Prisma schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title String @db.VarChar(255)
  content String?
  published Boolean @default(false)
  author User @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id Int @id @default(autoincrement())
  bio String?
  user User @relation(fields: [userId], references: [id])
  userId Int @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  password String
  posts   Post[]
  profile Profile?
  role  Role @default(USER)
  status Status @default(true)
}

enum Role {
  USER
  ADMIN
}

enum Status {
  true
  false
}

# 3. Run a migration to create your database tables with Prisma Migrate
npx prisma migrate dev --name init 

This command did two things:
1.It creates a new SQL migration file for this migration in the prisma/migrations directory.
2. It runs the SQL migration file against the database.

