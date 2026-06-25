# 📚 ShelfNest

A modern full-stack bookstore management system built with **Next.js**, **TypeScript**, **Prisma**, and **MySQL**.

ShelfNest is a commercial-style web application that enables customers to browse and purchase books while providing administrators with a complete inventory, order, coupon, and store management dashboard.

---

## 🚀 Features

### Customer Features

* User Registration & Login
* Secure Authentication (NextAuth)
* Browse Books
* Category Filtering
* Search Books
* Book Details
* Related Books
* Shopping Cart
* Wishlist
* Product Reviews & Ratings
* Coupon System
* Checkout
* Cash on Delivery (COD)
* Razorpay Payment Gateway
* Order History
* Responsive Design

---

### Admin Features

* Admin Dashboard
* Book Management (CRUD)
* Category Management (CRUD)
* Order Management
* Coupon Management
* Store Settings
* Payment Settings
* Inventory Management
* Low Stock Monitoring

---

## 💳 Payment Support

* Cash on Delivery
* Razorpay Integration
* Secure Payment Verification
* Payment Status Tracking

---

## 🛠 Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js Server Actions
* NextAuth
* Prisma ORM

### Database

* MySQL

### Cloud Services

* Cloudinary
* Razorpay

### Other Libraries

* Zod
* Sonner
* React Hook Form

---

## 📂 Project Structure

```
app/
components/
lib/
prisma/
public/
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/RCk1205/ShelfNest.git
```

Move into the project

```bash
cd ShelfNest
```

Install dependencies

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Run database migrations

```bash
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file containing:

```
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

## 📸 Screenshots

You can add screenshots inside:

```
public/screenshots/
```

Example:

* Home Page
* Book Details
* Shopping Cart
* Checkout
* Admin Dashboard
* Orders
* Coupons

---

## Future Improvements

* Skeleton Loading
* SEO Optimization
* Analytics Dashboard
* Accessibility Improvements
* Performance Optimization
* Email Notifications

---

## License

This project is for educational and portfolio purposes.

---

## Author

**Rahul Chourasia**

GitHub

https://github.com/RCk1205
