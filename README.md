<div align="center">

# 💇‍♀️ Glow Up — Salon Booking Backend

**A scalable REST API for a modern Salon Booking Platform**

Built with **Express.js, TypeScript, Prisma ORM, and PostgreSQL**

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
- [Live API](#-live-api)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Database Models](#️-database-models)
- [Authentication](#-authentication)
- [API Endpoints](#-api-endpoints)
- [API Documentation](#-api-documentation)
- [API Response Format](#-api-response-format)
- [Status Codes](#-status-codes)
- [Environment Variables](#️-environment-variables)
- [Installation](#️-installation)
- [Prisma Commands](#-prisma-commands)
- [Health Check](#-health-check)
- [Author](#-author)

---

## 📝 About

**Glow Up** is a backend REST API for a modern salon booking platform.

The system provides APIs for:

- User authentication
- Salon categories
- Salon services
- Service bookings
- Customer reviews

The backend follows a modular architecture designed to be scalable, maintainable, and easy to integrate with a frontend application.

---

## 🌐 Live API

**Base URL:**

```text
https://practice-prisma-and-postgresql.onrender.com
```

### Health Check

```http
GET /
```

The API returns a simple response to verify that the server is running successfully.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| ORM | Prisma ORM |
| Database | PostgreSQL / NeonDB |
| Authentication | JWT |
| Password Security | bcrypt |
| Configuration | dotenv |
| Cross-Origin Requests | CORS |

---

## ✨ Features

- 🔐 User Registration & Login
- 🪪 JWT Authentication
- 🔒 Password Hashing with bcrypt
- 🗂️ Category Management
- 💅 Salon Service Management
- 📅 Booking Management
- ⭐ Review Management
- 🗑️ Soft Delete Support
- 🔗 Prisma Relations
- 🏷️ Prisma Enums
- ⚡ Database Indexes
- 🕒 Created & Updated Timestamps
- ✅ Request Validation
- 🛡️ Centralized Error Handling
- 🚫 404 Not Found Handling
- 📦 Consistent API Response Structure
- 🧩 Modular Architecture

---

## 📁 Project Structure

```text
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   └── auth.service.ts
│   │
│   ├── category/
│   │   ├── category.controller.ts
│   │   └── category.service.ts
│   │
│   ├── service/
│   │   ├── service.controller.ts
│   │   └── service.service.ts
│   │
│   ├── booking/
│   │   ├── booking.controller.ts
│   │   └── booking.service.ts
│   │
│   └── review/
│       ├── review.controller.ts
│       └── review.service.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── category.routes.ts
│   ├── service.routes.ts
│   ├── booking.routes.ts
│   └── review.routes.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── not-found.middleware.ts
│   └── validation.middleware.ts
│
├── lib/
│   └── prisma.ts
│
├── app.ts
└── server.ts

prisma/
└── schema.prisma
```

---

## 🗄️ Database Models

The application uses a normalized relational database designed with Prisma ORM.

### Models

- `User`
- `Category`
- `Service`
- `Booking`
- `Review`

### Enums

#### Role

```text
USER
ADMIN
```

#### BookingStatus

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
```

#### ServiceStatus

```text
ACTIVE
INACTIVE
```

### Relationships

```text
User
 ├── Bookings
 └── Reviews

Category
 └── Services

Service
 ├── Category
 ├── Bookings
 └── Reviews

Booking
 ├── User
 └── Service

Review
 ├── User
 └── Service
```

### Database Features

- Primary keys using UUID
- Foreign key relationships
- Unique constraints
- Database indexes
- Enum fields
- Soft delete using `isDeleted`
- `createdAt` timestamps
- `updatedAt` timestamps
- Table mapping using `@@map()`

---

## 🔐 Authentication

Authentication is implemented using **JWT**.

### Registration

Users can create an account using their:

- Name
- Email
- Password

Passwords are hashed using **bcrypt** before being stored in the database.

### Login

After successful login, the API returns a JWT token.

Protected endpoints require the following HTTP header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📚 API Endpoints

## 🔑 Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |

---

## 🗂️ Categories

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/categories` | Create category |
| `GET` | `/api/categories` | Get all categories |
| `GET` | `/api/categories/:id` | Get category by ID |
| `PATCH` | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Soft delete category |

---

## 💅 Services

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/services` | Create service |
| `GET` | `/api/services` | Get all services |
| `GET` | `/api/services/:id` | Get service by ID |
| `PATCH` | `/api/services/:id` | Update service |
| `DELETE` | `/api/services/:id` | Soft delete service |

---

## 📅 Bookings

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create booking |
| `GET` | `/api/bookings` | Get all bookings |
| `GET` | `/api/bookings/:id` | Get booking by ID |
| `PATCH` | `/api/bookings/:id` | Update booking |
| `DELETE` | `/api/bookings/:id` | Soft delete booking |

---

## ⭐ Reviews

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/reviews` | Create review |
| `GET` | `/api/reviews` | Get all reviews |
| `GET` | `/api/reviews/:id` | Get review by ID |
| `PATCH` | `/api/reviews/:id` | Update review |
| `DELETE` | `/api/reviews/:id` | Soft delete review |

---

# 📚 API Documentation

This section provides request and response examples for the main API modules.

---

## 🔑 Authentication API

### Register User

**POST**

```text
/api/auth/register
```

### Request Body

```json
{
  "name": "Tania",
  "email": "tania@gmail.com",
  "password": "123456"
}
```

### Success Response

**Status: `201 Created`**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "name": "Tania",
    "email": "tania@gmail.com",
    "role": "USER"
  }
}
```

---

### Login User

**POST**

```text
/api/auth/login
```

### Request Body

```json
{
  "email": "tania@gmail.com",
  "password": "123456"
}
```

### Success Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "name": "Tania",
      "email": "tania@gmail.com",
      "role": "USER"
    },
    "token": "JWT_TOKEN"
  }
}
```

---

# 🗂️ Category API

## Create Category

**POST**

```text
/api/categories
```

### Request Body

```json
{
  "name": "Hair Care",
  "description": "Hair care related salon services"
}
```

### Response

**Status: `201 Created`**

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": "category-id",
    "name": "Hair Care",
    "description": "Hair care related salon services"
  }
}
```

---

## Get All Categories

**GET**

```text
/api/categories
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": []
}
```

---

## Get Category By ID

**GET**

```text
/api/categories/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {}
}
```

---

## Update Category

**PATCH**

```text
/api/categories/:id
```

### Request Body

```json
{
  "name": "Hair & Beauty Care",
  "description": "Updated category description"
}
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {}
}
```

---

## Delete Category

**DELETE**

```text
/api/categories/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": null
}
```

> The delete operation uses soft delete through the `isDeleted` field.

---

# 💅 Service API

## Create Service

**POST**

```text
/api/services
```

### Request Body

```json
{
  "name": "Hair Cut",
  "description": "Professional haircut service",
  "price": 500,
  "duration": 30,
  "categoryId": "category-id"
}
```

### Response

**Status: `201 Created`**

```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {}
}
```

---

## Get All Services

**GET**

```text
/api/services
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Services retrieved successfully",
  "data": []
}
```

---

## Get Service By ID

**GET**

```text
/api/services/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Service retrieved successfully",
  "data": {}
}
```

---

## Update Service

**PATCH**

```text
/api/services/:id
```

### Request Body

```json
{
  "name": "Premium Hair Cut",
  "price": 700,
  "duration": 45
}
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": {}
}
```

---

## Delete Service

**DELETE**

```text
/api/services/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Service deleted successfully",
  "data": null
}
```

> The delete operation uses soft delete through the `isDeleted` field.

---

# 📅 Booking API

## Create Booking

**POST**

```text
/api/bookings
```

### Request Body

```json
{
  "serviceId": "service-id",
  "date": "2026-08-20T10:00:00.000Z",
  "notes": "Please provide a professional haircut"
}
```

### Response

**Status: `201 Created`**

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {}
}
```

---

## Get All Bookings

**GET**

```text
/api/bookings
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Bookings retrieved successfully",
  "data": []
}
```

---

## Get Booking By ID

**GET**

```text
/api/bookings/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Booking retrieved successfully",
  "data": {}
}
```

---

## Update Booking

**PATCH**

```text
/api/bookings/:id
```

### Request Body

```json
{
  "status": "CONFIRMED",
  "notes": "Booking confirmed"
}
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {}
}
```

---

## Delete Booking

**DELETE**

```text
/api/bookings/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Booking deleted successfully",
  "data": null
}
```

---

# ⭐ Review API

## Create Review

**POST**

```text
/api/reviews
```

### Request Body

```json
{
  "serviceId": "service-id",
  "rating": 5,
  "comment": "Excellent service!"
}
```

### Response

**Status: `201 Created`**

```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {}
}
```

---

## Get All Reviews

**GET**

```text
/api/reviews
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": []
}
```

---

## Get Review By ID

**GET**

```text
/api/reviews/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Review retrieved successfully",
  "data": {}
}
```

---

## Update Review

**PATCH**

```text
/api/reviews/:id
```

### Request Body

```json
{
  "rating": 4,
  "comment": "Very good service!"
}
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {}
}
```

---

## Delete Review

**DELETE**

```text
/api/reviews/:id
```

### Response

**Status: `200 OK`**

```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": null
}
```

> The delete operation uses soft delete through the `isDeleted` field.

---

# 📦 API Response Format

All API responses follow a consistent structure.

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": null
}
```

---

# 🔢 Status Codes

| Status Code | Meaning |
|---|---|
| `200` | Request successful |
| `201` | Resource created successfully |
| `400` | Bad request / validation error |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Resource or route not found |
| `500` | Internal server error |

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Important

Never commit the `.env` file to GitHub.

The `.env` file should remain in `.gitignore`.

---

# 🛠️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/taniashahida-dev/Practice-prisma-and-PostgreSQL.git
```

## 2. Navigate to the Project

```bash
cd Practice-prisma-and-PostgreSQL
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 5. Generate Prisma Client

```bash
npx prisma generate
```

## 6. Run Database Migration

```bash
npx prisma migrate dev
```

## 7. Start Development Server

```bash
npm run dev
```

---

# 🔧 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server using `ts-node-dev`.

### Build

```bash
npm run build
```

Compiles TypeScript into JavaScript.

### Production

```bash
npm start
```

Starts the compiled production server.

### Type Check

```bash
npx tsc --noEmit
```

Checks the project for TypeScript errors without generating files.

---

# 🧩 Prisma Commands

### Generate Prisma Client

```bash
npx prisma generate
```

### Create Migration

```bash
npx prisma migrate dev --name migration_name
```

### Check Migration Status

```bash
npx prisma migrate status
```

### Open Prisma Studio

```bash
npx prisma studio
```

Prisma Studio can be used to inspect and manage database records during development.

---

# 🩺 Health Check

### Endpoint

```http
GET /
```

### Response

```json
{
  "success": true,
  "message": "Glow Up Backend API is running",
  "data": null
}
```

---

# 🛡️ Security & Code Quality

The project follows several practices for maintainability and security:

- Passwords are hashed using bcrypt.
- Authentication uses JWT.
- Environment secrets are stored in `.env`.
- `.env` is excluded from Git.
- Database access is handled through Prisma ORM.
- TypeScript provides static type checking.
- APIs are organized into modules.
- Centralized error handling is implemented.
- 404 routes are handled through dedicated middleware.
- Soft delete is used instead of permanently deleting records.
- Database indexes are used for frequently queried fields.

---

# 📌 Project Requirements Coverage

| Requirement | Status |
|---|---|
| Express.js | ✅ |
| TypeScript | ✅ |
| PostgreSQL / NeonDB | ✅ |
| Prisma ORM | ✅ |
| JWT Authentication | ✅ |
| bcrypt Password Hashing | ✅ |
| dotenv | ✅ |
| CORS | ✅ |
| Modular Architecture | ✅ |
| Minimum 4 Services | ✅ |
| Prisma Relations | ✅ |
| Prisma Enums | ✅ |
| Soft Delete | ✅ |
| Created & Updated Timestamps | ✅ |
| `@@map()` | ✅ |
| CRUD APIs | ✅ |
| Prisma Migrate | ✅ |
| Prisma Studio | ✅ |
| Database Indexes | ✅ |
| Centralized Error Handling | ✅ |
| API Documentation | ✅ |
| Live Backend API | ✅ |

---

# 🔗 Project Links

### Live Backend API

https://practice-prisma-and-postgresql.onrender.com

### GitHub Repository

https://github.com/taniashahida-dev/Glow-Up-backend

---

## 👩‍💻 Author

**Tania Shahida**

Web Developer — Frontend & Backend

- GitHub: [@taniashahida-dev](https://github.com/taniashahida-dev)
- Portfolio: [tania-webdev.vercel.app](https://tania-webdev.vercel.app)

---

<div align="center">

**Made with 💖 by Tania**

</div>
