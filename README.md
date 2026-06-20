# SoukPay Rewards App

## Tech Stack

### Frontend

* React Native with Expo
* Expo Router
* Redux
* TypeScript
* NativeWind
* Axios

  

### Backend

* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* TypeScript

### Database

* PostgreSQL (Docker)

---


## Project Structure

```text
root/
├── docker-compose.yml
├── frontend/
└── backend/
```

---

## Running the Database

From the project root:

```bash
docker compose up -d
```

This starts a PostgreSQL database container on port 5432.

---

## Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/soukpayRewards"
JWT_SECRET="your-secret"
PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate deploy
```

Seed the database:

```bash
npx prisma db seed
```

Start the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Running the Mobile App

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
EXPO_PUBLIC_BACKEND_URL=http://YOUR_LOCAL_IP:5000/api
```

Example:

```env
EXPO_PUBLIC_BACKEND_URL=http://192.168.1.100:5000/api
```

Example(Android Emulator):

```env
EXPO_PUBLIC_BACKEND_URL=http://10.0.2.2:5000/api
```

Replace `YOUR_LOCAL_IP` with the IP address of the machine running the backend server.

Start Expo:

```bash
npx expo start
```

---

## Demo Accounts

You can use the following seeded accounts to test the application:

### User Account 1
- Email: alice@example.com
- Password: Password123!

### User Account 2
- Email: bob@example.com
- Password: Password123!

### User Account 3
- Email: carol@example.com
- Password: Password123!


---

## Architecture Decisions

### Backend

* Express.js was used to create REST APIs.
* Prisma ORM was used for type-safe database access.
* PostgreSQL was selected for relational data consistency.
* JWT authentication was implemented for secure user sessions.
* Database schema changes are managed through Prisma migrations.

### Mobile

* Used Expo Router
* Redux to manages global application state.
* Secure token storage is handled using expo-secure-store.
* API requests are separated into service layers for maintainability.
* TypeScript is used throughout the project for type safety.
* NativeWind was used to enable a utility-first styling approach.
* Axios for API calls

---

## Bonus Features Implemented

### Logout Functionality

* Users can securely log out from the profile section.

### Leaderboard API

* Implemented:

```http
GET /leaderboard
```

* Returns the top 10 users ranked by lifetime points.

### Offline Detection

* Detects network connectivity changes.
* Displays an offline banner.
* Disables the Redeem button while offline.

### Loading Skeletons

* Skeleton placeholder UI is displayed while data loads.

### Animated Balance Updates

* Point balance smoothly animates when:

  * Home ,History,Reward screen loads
  * After Successful Reward Redeem


---

## What I Would Add With More Time

* Refresh token authentication flow
* End-to-end mobile testing
* New Screen for leaderboard results
* Push notifications for rewards
* Improved accessibility support
* Rate limiting and additional API security measures
* Analytics and monitoring
* Enhanced offline caching and synchronization
