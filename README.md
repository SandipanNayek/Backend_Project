# Backend Project (Node.js + Express + MongoDB)

## 🚀 Overview

This backend project provides APIs for user authentication, video management, and watch history tracking. It uses Express.js, MongoDB (Mongoose), JWT authentication, and Multer for file uploads.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* Multer (File Upload)
* Cloudinary (optional for media storage)

---

## 📁 Features

* User authentication (register, login, logout)
* JWT-based authorization
* Upload avatar (profile picture)
* Video upload & management
* Watch history tracking
* Aggregation pipelines with `$lookup`

---

## 🔐 Authentication

* Uses JWT tokens
* Protected routes require `verifyJWT` middleware

---

## 📦 API Endpoints

### 🧑 User

* `POST /api/users/register` → Register user
* `POST /api/users/login` → Login user
* `POST /api/users/logout` → Logout user
* `PATCH /api/users/avatar` → Update avatar (uses Multer)

### 🎥 Videos

* `POST /api/videos` → Upload video
* `GET /api/videos/:id` → Get video

### 📺 Watch History

* `GET /api/users/watch-history` → Get user watch history

---

## 🧠 Important Concepts

### 🔗 MongoDB `$lookup`

Used to join collections (User ↔ Videos)

### 📂 Multer

Handles file uploads (avatar, videos)

### 🧩 Middleware

* `verifyJWT` → Authentication
* `upload.single()` → File parsing

---

## ⚙️ Installation

```bash
npm install
```

---

## ▶️ Run Project

```bash
npm run dev
```

---

## 🌍 Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_URL=your_cloudinary_config
```

---

## 📌 Notes

* Use `PATCH` for partial updates (like avatar)
* Use `POST` for actions (login, register)
* Use aggregation for complex queries

---

## 🙌 Author

Sandipan Nayek
