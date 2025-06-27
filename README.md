# 🏠 Roommate Finder - Server

📂 **GitHub Repository**: [https://github.com/Jakia123sultana/roommate-server-side](https://github.com/Jakia123sultana/roommate-server-side)  
🌐 **Live API Base URL**: [https://roommate-server-side.vercel.app](https://roommate-server-side.vercel.app)

This is the **backend** for the Roommate Finder application, built using Node.js and Express.js. It powers the data and API for listing roommates, allowing users to post, update, and manage their listings.

---

## 🚀 Features

- 📤 Create and store roommate posts
- 📄 Fetch all listings
- 🗑️ Delete a listing by ID
- ✏️ Update a listing
- 🔐 (Optional) Authentication middleware using JWT

---

## 🧑‍💻 Tech Stack

- Node.js
- Express.js
- MongoDB (Native Driver)
- dotenv
- CORS

---

## 🌐 Live API Examples

> **Base URL**: `https://roommate-server-side.vercel.app`

### 🔍 Get All Listings
```http
GET https://roommate-server-side.vercel.app/roommates
