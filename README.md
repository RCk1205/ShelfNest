# 📚 ShelfNest

> A full-stack bookstore management system built with **Next.js**, **TypeScript**, **Prisma**, and **MySQL**.

ShelfNest is a modern bookstore application that provides customers with a seamless online shopping experience while offering administrators a centralized dashboard for managing books, categories, orders, coupons, inventory, and store settings.

---

# ✨ Features

## Customer Features

* Secure User Authentication
* Browse Books by Category
* Search Books
* Book Detail Pages
* Related Book Suggestions
* Shopping Cart
* Wishlist
* Customer Reviews & Ratings
* Coupon Code Support
* Cash on Delivery (COD)
* Razorpay Online Payments
* Order History
* Responsive User Interface

---

## Admin Features

* Secure Admin Login
* Dashboard Overview
* Book Management (Create, Update, Delete)
* Category Management
* Order Management
* Coupon Management
* Store Configuration
* Payment Method Configuration
* Inventory & Stock Management

---

# 💳 Payment Integration

ShelfNest supports multiple payment methods:

* Cash on Delivery
* Razorpay
* UPI
* Credit / Debit Card
* Net Banking

Payment verification is handled securely before order confirmation.

---

# 🛠 Technology Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

## Backend

* Next.js Server Actions
* NextAuth.js
* Prisma ORM

## Database

* MySQL

## Cloud Services

* Cloudinary
* Razorpay

## Libraries

* Zod
* Sonner
* React Hook Form

---

# 📂 Project Structure

```text
app/
components/
lib/
prisma/
public/
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/RCk1205/ShelfNest.git
```

## Move into the project

```bash
cd ShelfNest
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=

NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

---

## Run Prisma Migration

```bash
npx prisma migrate dev
```

---

## Start Development Server

```bash
npm run dev
```

---

# 📦 Production Build

```bash
npm run build
```

---

# 🔒 Security Highlights

* Authentication using NextAuth.js
* Server-side data validation
* Prisma ORM for database safety
* Transaction-based order creation
* Secure Razorpay payment verification
* Input validation on customer and admin forms

---

# 📋 Core Modules

* Authentication
* Books
* Categories
* Search
* Cart
* Wishlist
* Reviews
* Coupons
* Checkout
* Orders
* Admin Dashboard
* Store Settings
* Payment Settings

---

# 📈 Future Improvements

* Email Notifications
* Sales Analytics Dashboard
* Inventory Reports
* Product Recommendations
* SEO Enhancements
* Accessibility Improvements
* Performance Optimization

---

# 👨‍💻 Developer

**Rahul Chourasia**

GitHub: https://github.com/RCk1205

---

# 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
