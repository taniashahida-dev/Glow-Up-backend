<div align="center">

# 💇‍♀️ Glow Up — Salon Booking Backend

**A scalable REST API for a modern Salon Booking Platform**

Built with Express.js, TypeScript, Prisma ORM, and PostgreSQL

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Database Models](#️-database-models)
- [Authentication](#-authentication)
- [API Endpoints](#-api-endpoints)
- [API Response Format](#-api-response-format)
- [Environment Variables](#️-environment-variables)
- [Installation](#️-installation)
- [Health Check](#-health-check)
- [Author](#-author)

---

## 📝 About

**Glow Up** is the backend engine for a salon booking platform — handling everything from user authentication to service catalogs, bookings, and customer reviews. It's built with a clean, modular architecture that's easy to extend and maintain.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **ORM** | Prisma |
| **Database** | PostgreSQL / NeonDB |
| **Auth** | JWT Authentication |
| **Security** | bcrypt (password hashing) |
| **Config** | dotenv |
| **Middleware** | CORS |

---

## ✨ Features

- 🔐 User Registration & Login
- 🪪 JWT Authentication
- 🔒 Password Hashing with bcrypt
- 🗂️ Category Management
- 💅 Salon Service Management
- 📅 Booking Management
- ⭐ Review Management
- 🗑️ Soft Delete
- 🔗 Prisma Relations
- 🏷️ Prisma Enums
- ⚡ Database Indexes
- ✅ Request Validation
- 🛡️ Centralized Error Handling
- 🚫 404 Not Found Handling

---

## 📁 Project Structure

```text
src/
├── modules/
│   ├── auth/
│   ├── category/
│   ├── service/
│   ├── booking/
│   └── review/
│
├── routes/
├── middleware/
├── lib/
├── app.ts
└── server.ts

prisma/
└── schema.prisma
```

---

## 🗄️ Database Models

The project uses the following Prisma models:

- `User`
- `Category`
- `Service`
- `Booking`
- `Review`

**Enums**

- `Role`
- `BookingStatus`
- `ServiceStatus`

> The database includes proper relationships, indexes, timestamps, and soft delete support.

---

## 🔐 Authentication

Authentication is implemented using **JWT**.

- Passwords are securely hashed using **bcrypt**.
- Protected routes require the following header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📚 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |

### 🗂️ Categories

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/categories` | Create category |
| `GET` | `/api/categories` | Get all categories |
| `GET` | `/api/categories/:id` | Get category by ID |
| `PATCH` | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Soft delete category |

### 💅 Services

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/services` | Create service |
| `GET` | `/api/services` | Get all services |
| `GET` | `/api/services/:id` | Get service by ID |
| `PATCH` | `/api/services/:id` | Update service |
| `DELETE` | `/api/services/:id` | Soft delete service |

### 📅 Bookings

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create booking |
| `GET` | `/api/bookings` | Get all bookings |
| `GET` | `/api/bookings/:id` | Get booking by ID |
| `PATCH` | `/api/bookings/:id` | Update booking |
| `DELETE` | `/api/bookings/:id` | Soft delete booking |

### ⭐ Reviews

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/reviews` | Create review |
| `GET` | `/api/reviews` | Get all reviews |
| `GET` | `/api/reviews/:id` | Get review by ID |
| `PATCH` | `/api/reviews/:id` | Update review |
| `DELETE` | `/api/reviews/:id` | Soft delete review |

---

## 📦 API Response Format

**Success**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error**

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": null
}
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

> ⚠️ **Never commit the `.env` file to GitHub.**

---

## 🛠️ Installation

**1. Install dependencies**

```bash
npm install
```

**2. Generate Prisma Client**

```bash
npx prisma generate
```

**3. Run the development server**

```bash
npm run dev
```

**4. Type check**

```bash
npx tsc --noEmit
```

---

## 🩺 Health Check

```
GET /
```

**Response**

```json
{
  "success": true,
  "message": "Glow Up Backend API is running",
  "data": null
}
```

---

## 👩‍💻 Author

**Tania**
Web Developer — Frontend & Backend

- GitHub: [@taniashahida-dev](https://github.com/taniashahida-dev)
- Portfolio: [tania-webdev.vercel.app](https://tania-webdev.vercel.app)

<div align="center">

Made with 💖 by Tania

</div>
