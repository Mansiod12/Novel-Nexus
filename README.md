# 📚 Novel Nexus – MERN Bookstore App

**Novel Nexus** is a beautifully crafted full-stack **online bookstore** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It offers a smooth user experience for browsing, purchasing, and managing books. With a clean and inviting UI, it’s perfect for readers looking for their next great read — and developers looking to learn full-stack web development with payment integration.

---

## Live Demo: https://novel-nexus-gpq8.vercel.app/

## 🚀 Key Features

- 🧾 Browse all available books with detailed info
- 🔐 User authentication (signup/login/logout)
- 📚 Add/edit/delete books (admin-friendly features)
- 🛒 Add books to a cart and checkout
- 💳 Stripe integration for test payments
- 📱 Responsive design for all devices
- 🎨 Calming and aesthetic UI focused on readability

---

## 🛠️ Tech Stack

| Technology     | Description                          |
|----------------|--------------------------------------|
| MongoDB        | Stores user and book data            |
| Express.js     | Backend framework to serve APIs      |
| React.js       | Frontend UI library                  |
| Node.js        | Runtime for backend JavaScript       |
| Mongoose       | ODM for MongoDB                      |
| JWT            | Authentication with JSON Web Tokens  |
| Stripe API     | Secure test payment integration      |
| Tailwind CSS   | Modern, utility-first CSS framework  |

---

## 💳 Stripe Integration

Stripe is integrated in **test mode** for safe and seamless simulated transactions.

### 🧪 Test Card Details

Use the following to test the checkout:

Card Number: 4242 4242 4242 4242
Expiry Date: Any future date (e.g., 12/34)
CVC: Any 3-digit code
ZIP Code: Any 5-digit number

> Note: No actual charges are made.

---

## 📦 Getting Started

### ✅ Prerequisites

- Node.js and npm
- MongoDB Atlas or local setup
- Stripe account (for keys in test mode)

---

### 🔧 Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/novel-nexus.git
cd novel-nexus

2. Backend Setup

cd server
npm install

Create a .env file inside server/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_test_secret

Run the backend server:

npm run dev

3. Frontend Setup

cd client
npm install
npm start

