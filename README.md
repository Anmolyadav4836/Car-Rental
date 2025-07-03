# Car Rental Project

## 🚗 Overview

This is a full-stack Car Rental web application that allows users to browse, search, and book cars for rent. Owners can list their vehicles, manage bookings, and update car details. The platform features a modern UI, authentication, and real-time feedback for a seamless rental experience.

---

## ✨ Main Features

### For Users
- **Browse Cars:** View a list of available cars with images, details, and prices.
- **Search & Filter:** Search cars by location, date, category, and more.
- **Book Cars:** Select rental period, location, and book cars instantly.
- **My Bookings:** View and manage your current and past bookings.
- **Profile Management:** Update your profile information and password.

### For Owners
- **List a Car:** Add new cars with images, specifications, and pricing.
- **Manage Listings:** Edit or remove listed cars.
- **Booking Dashboard:** View and manage bookings for your cars.

### General
- **Authentication:** Secure login and registration for users and owners.
- **Responsive Design:** Fully responsive for desktop and mobile devices.
- **Animated UI:** Smooth transitions and feedback using Framer Motion and Tailwind CSS.
- **Loader Spinners:** Visual feedback during data fetching and form submissions.
- **Error Handling:** User-friendly error messages and notifications.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, JWT, Bcrypt, ImageKit, 
- **Database:** MongoDB 
- **State Management:** React Context API
- **Other:** React Router, Axios, React Hot Toast

---

## 📁 Project Structure

- `/frontend/src/components` - Reusable UI components (Navbar, Loader, CarCard, etc.)
- `/frontend/src/pages` - Main pages (Home, MyBooking, AddCar, etc.)
- `/frontend/src/context` - App-wide context and state management
- `/frontend/src/assets` - Images and static assets

---

## 🚀 How It Works

1. **User Registration/Login:**  
   Users and owners can register and log in securely.

2. **Browse & Search:**  
   Users can search for cars by city, date, and other filters.

3. **Book a Car:**  
   Select a car, choose rental dates, and confirm the booking.

4. **Manage Bookings:**  
   Users can view, update, or cancel their bookings.

5. **List a Car (Owner):**  
   Owners can add new cars, upload images, and set prices.

6. **Profile Management:**  
   Users can update their profile info and password. Profile image or first letter of name is shown in the navbar.

7. **Loading & Feedback:**  
   Loader spinners and toast notifications provide real-time feedback for all actions.

---

## 📝 Notes

- Make sure to configure your backend API endpoints and database connection.
- Update environment variables as needed for deployment.
- For any issues or contributions, please open an issue or pull request.

---
