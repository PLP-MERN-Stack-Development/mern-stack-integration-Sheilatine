
# 📰 MERN Blog Application

A **full-stack blog platform** built using the **MERN stack** — MongoDB, Express, React (Vite + Tailwind v4), and Node.js — featuring **user authentication (JWT)**, **post creation**, and **modern responsive design**.

--

## 🚀 Features

* 🔐 User authentication (register, login, logout)
* ✍️ Create, edit, and view blog posts
* 🧠 JWT-based authentication middleware
* 🌈 Styled with Tailwind CSS v4
* ⚡ Powered by Vite for fast frontend builds
* 💾 MongoDB for persistent data storage
* 🔄 RESTful API architecture

---

## 🗂️ Folder Structure

```
mern-blog/
│
├── backend/
│   ├── models/
│   │   └── User.js
│   │   └── Post.js
│   ├── routes/
│   │   └── auth.js
│   │   └── posts.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── PostPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── vite.config.js
│   ├── .env
│
└── README.md
```

---

## ⚙️ Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS v4
* Axios
* React Router DOM

**Backend**

* Node.js
* Express
* MongoDB + Mongoose
* bcryptjs
* jsonwebtoken
* dotenv
* cors

---

## 🧩 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/mern-blog.git

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:

```env
MONGO_URI=mongodb+srv://<your-mongodb-uri>
JWT_SECRET=yourSuperSecretKey
PORT=5000
```

Run backend:

```bash
npm start
```

Expected output:

```
Connected to MongoDB
Server running on port 5000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `client/` with:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

## 🧠 API Routes

### 🔹 Auth Routes

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | `/api/auth/register` | Register a new user               |
| POST   | `/api/auth/login`    | Login and get JWT                 |
| GET    | `/api/auth/me`       | Get current user (requires token) |

### 🔹 Post Routes

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/posts`     | Get all posts                |
| GET    | `/api/posts/:id` | Get single post              |
| POST   | `/api/posts`     | Create post (requires token) |

---

## 💡 Environment Variables Summary

| Location | Variable       | Example                                                |
| -------- | -------------- | ------------------------------------------------------ |
| Backend  | `MONGO_URI`    | your MongoDB connection string                         |
| Backend  | `JWT_SECRET`   | secret key for JWT                                     |
| Backend  | `PORT`         | 5000                                                   |
| Frontend | `VITE_API_URL` | [http://localhost:5000/api](http://localhost:5000/api) |

---

## 🧱 Example User Flow

1️⃣ User visits `/register` → creates account → token stored in `localStorage`
2️⃣ User logs in → redirected to home → token attached to requests
3️⃣ User can create/view posts → data saved in MongoDB

---

#### `src/index.css`

```css
@import "tailwindcss";
```

--

## 👩🏽‍💻 Author

**Sheila Christine**

Would you like me to make this README *auto-tailored* for your specific project name (e.g. “ExploreChuka Blog” or “Sheila’s Dev Journal”) — with your logo colors and tagline included?
