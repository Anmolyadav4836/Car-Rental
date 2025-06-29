# Car Rental Project – Backend

This backend powers the Car Rental Project, providing secure APIs for user management, car listings, bookings, and owner operations.

## Features

### User Features
- **User Registration & Login** (JWT-based authentication)
- **Profile Management**
  - Update profile image (with ImageKit integration)
  - Get user data
- **View Bookings**
  - Get all bookings for the logged-in user

### Car Features
- **List Cars**
  - View all available cars by location and date
  - Check car availability for specific dates
- **Book Cars**
  - Create a booking for a car
  - Calculate price based on rental duration

### Owner Features
- **Role Management**
  - Change user role to owner
- **Car Management**
  - Add a new car (with image upload)
  - Toggle car availability
  - Delete a car
  - View all cars owned by the user
- **Booking Management**
  - View all bookings for owned cars
  - Change booking status (pending/completed/cancelled)
- **Dashboard**
  - View total cars, bookings, pending/completed bookings, recent bookings, and monthly revenue

### Security & Middleware
- **JWT Authentication Middleware**
- **Role-based Access Control**
- **Multer for File Uploads**
- **ImageKit Integration for Image Storage**

### Utilities
- **Error Handling**
- **Environment Variable Support (`.env`)**
- **MongoDB with Mongoose**

---

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Set up your `.env` file:**
   ```
   MONGODB_URI=your_mongodb_uri.
   JWT_SECRET=your_jwt_secret.
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key.
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key.
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint.
   ```

3. **Run the server:**
   ```sh
    nodemon index.js
   ```

---

## Folder Structure

- `/controllers` – All business logic for users, owners, bookings, etc.
- `/models` – Mongoose models for User, Car, Booking
- `/routes` – Express route definitions
- `/middlewares` – Auth, Multer, and other middleware
- `/config` – Configuration files (e.g., ImageKit)

---

## API Endpoints

> See the code for detailed endpoint paths and request/response formats.

---

