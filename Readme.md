# 🤖 AI Study Assistant Platform

An **AI-powered study assistant platform** built using the **MERN stack** that helps students understand concepts, summarize notes, ask questions, and manage study materials efficiently.

The platform integrates **AI models via OpenRouter API**, secure **JWT authentication**, and **Cloudinary cloud storage** for managing uploaded notes.

---

# 📚 Project Overview

The **AI Study Assistant Platform** is designed to improve learning productivity by combining modern **AI capabilities with a full-stack web application**.

Students can:

* Upload and manage study notes
* Ask AI questions about academic topics
* Generate summaries of notes
* Get simplified explanations of complex concepts
* Store study history securely

The platform ensures **secure authentication using JWT** and **cloud-based storage using Cloudinary**.

---

# 🛠 Tech Stack

## Frontend

* **React (Vite)** – Fast modern frontend
* **JavaScript**
* **CSS / TailwindCSS**

## Backend

* **Node.js**
* **Express.js**

## Database

* **MongoDB**

## Authentication

* **JWT (JSON Web Token)**

## Cloud Storage

* **Cloudinary** – Upload and store notes, images, or documents

## AI Integration

* **OpenRouter API**

  * Access multiple AI models
  * Used for answering questions and summarization

---

# 🏗 System Architecture

```
Frontend (React + Vite)
        │
        ▼
Backend API (Node.js + Express)
        │
 ┌──────┴────────┐
 ▼               ▼
MongoDB      OpenRouter API
(Database)     (AI Models)

        │
        ▼
Cloudinary
(File Storage)
```

The **backend acts as the central controller** that:

* Handles user authentication
* Stores user data in MongoDB
* Uploads notes to Cloudinary
* Sends prompts to AI models via OpenRouter
* Returns responses to the frontend

---

# 🔐 Authentication (JWT)

The platform uses **JWT authentication** to secure user accounts.

### Flow

1. User registers or logs in
2. Server generates a **JWT token**
3. Token is stored in the client
4. Protected routes verify the token before access

### Example JWT Middleware

```javascript
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
```

---

# ☁️ Cloud Storage (Cloudinary)

Users can **upload study notes, PDFs, or images** which are stored securely on **Cloudinary**.

### Features

* Upload study materials
* Retrieve stored notes
* Cloud-based file storage
* Optimized delivery

### Example Upload

```javascript
import cloudinary from "cloudinary";

const result = await cloudinary.uploader.upload(req.file.path, {
  folder: "study-notes"
});
```

The uploaded file URL is stored in **MongoDB** for later retrieval.

---

# 🤖 AI Integration (OpenRouter API)

The platform integrates **OpenRouter API** to access powerful AI models for:

* Question answering
* Concept explanation
* Notes summarization

### Example Request

```javascript
import axios from "axios";

const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-4o-mini",
    messages: [
      { role: "user", content: "Explain Newton's Laws in simple terms" }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);
```

---

# ⚙️ Core Features

### 🧠 AI Question Answering

Students can ask academic questions and receive AI explanations.

### 📄 AI Notes Summarization

Upload notes and generate concise summaries.

### 📚 Notes Management

Upload and retrieve study materials from Cloudinary.

### 🔐 Secure Authentication

JWT-based login and protected API routes.

### 📊 Study History

Store and retrieve past AI interactions.

---

# 📁 Project Structure

```
AI-Study-Assistant
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── config
│   │   └── cloudinary.js
│   ├── utils
│   │   └── openrouter.js
│   ├── server.js
│   └── .env
│
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/ai-study-assistant.git
cd ai-study-assistant
```

---

## 2️⃣ Install Dependencies

### Frontend

```
cd frontend
npm install
npm run dev
```

### Backend

```
cd backend
npm install
npm run server
```

---

# 🔐 Environment Variables

Create a `.env` file in the **backend** folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 📈 Future Improvements

* AI flashcard generator
* AI quiz generator
* Voice-based AI tutor
* PDF summarization
* Study progress tracking
* Collaborative study groups

---

# 🎯 Goal

To create a **secure AI-powered learning platform** that helps students study smarter using modern **AI + cloud technologies**.

---

## Thank you