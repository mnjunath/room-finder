# 🏠 Room Finder Website

A full-stack Room Finder web application that allows users to search for rental rooms and enables room owners to add, manage, and edit their room listings.

This project is built using **React (Vite)** on the frontend and **Supabase** as the backend (authentication, database, storage).

---

## 🚀 Features

### 👤 User (Room Finder)
- Browse all available rooms
- Search rooms by **location**
- Apply multiple filters:
  - Price range
  - Property type
  - Tenant preference
- View room details with image slider
- View owner contact details

### 🏠 Owner (Room Owner)
- Register and login securely
- Add new room listings
- Upload **multiple room images**
- View all rooms added by them
- Edit room details
- Delete room listings

### 🔐 Authentication & Authorization
- Email/password authentication using Supabase
- Email verification on registration
- Role-based access (User / Owner)
- Only owners can add, edit, or delete rooms

---

## 🧱 Tech Stack

### Frontend
- **React (Vite)**
- React Router
- CSS (custom, responsive, mobile-first)
- Netlify (deployment)

### Backend (BaaS)
- **Supabase**
  - Authentication
  - PostgreSQL Database
  - Storage (room images)
  - Row Level Security (RLS)

---

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── RoomCard.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Rooms.jsx
│   ├── AddRoom.jsx
│   ├── EditRoom.jsx
│   ├── MyRooms.jsx
│
├── css/
│   ├── auth.css
│   ├── navbar.css
│   ├── roomCard.css
│   ├── rooms.css
│   ├── addRoom.css
│   ├── myRooms.css
│
├── supabase/
│   └── client.js
│
├── App.jsx
├── main.jsx
