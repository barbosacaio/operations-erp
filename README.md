# 👥 OperationsERP

**OperationsERP** is an educational project motivated by my code-related studies. The goal is to have a fully working application running on the web that allows you to manage your company along with **employee management, project/task management, work logs, invoice system and audit logs**. This project was made with the goal of polishing my server-sided skills as well and finish my first project with a user-sided interface.

## 🏗️ Project Status: `development`

## 📋 Functions

- Authentication with JWT
- Organization structure (companies, users, roles, and teams/departments)
- Employee management (profile, role, department, status, and costs per hour)
- Project / task management (assignment, status, and audit logs)
- Work logs (clock in / clock out, manual time entries and validation rules)
- Invoicing (generate invoices from time logs, status and PDF generation)
- Audit logs (change owner information, previous/current values and timestamp)

## 🛠️ Tech Stack

- **Front-end**
  <p align="center">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </p>

- **Back-end**
  <p align="center">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  </p>

- **Database**
  <p align="center">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  </p>

- **ORM**
  <p align="center">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma">
  </p>

- **Authentication**
  <p align="center">
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT">
  </p>

- **Code Quality & Standards**
  <p align="center">
    <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
    <img src="https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier">
  </p>

- **Testing**
  <p align="center">
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
  </p>

- **DevOps & Infrastructure**
  <p align="center">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  </p>

## 🧱 Data Model

- Company
- User
- Employee
- Department
- Project
- Task
- Invoice
- AuditLog

## ❔ How To Run

- [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

- Create a ``.env`` file based on the ``.env.example`` of both ``/backend`` and ``/frontend``. The file name also needs to be adjusted based on which environment you want to run
  - **Back-end**
    - Development environment: ``.env``
    - Production environment: ``.env.production``
    - Test environment: ``.env.test``
  - **Front-end**
    - Development environment: ``.env``
    - Production environment: ``.env.production``

- Initiate Docker for the environment you selected
  - **Development** environment: ``npm run docker:dev``
  - **Production** environment: ``npm run docker:prod``
  - **Test** environment: ``npm run docker:test``

- You can also stop Docker or check information with:
  - **Stop** containers: ``npm run docker:down``
  - **Stop** containers and **remove volumes**: ``npm run docker:down:volumes``
  - **Follow logs** in real time: ``npm run docker:logs``

- Docker will automatically configure the database based on its environment commands. If you'd like to run it locally, this is configured by default as well. Configure the correspondent ``.env`` file for the environment you chose, and ensure the ``DATABASE_URL`` has your correct credentials and database information

- ...

## 👤 Author

- [@barbosacaio](https://github.com/barbosacaio)
