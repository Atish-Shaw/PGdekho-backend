# PIGI

A full-stack PG listing and management web application built with Node.js, Express.js, MongoDB, Mongoose and EJS.

## Features

* User authentication
* Host authentication
* Role-based authorization
* PG listing creation
* Edit and delete listings
* Listing ownership
* Favourite PGs
* User-specific favourites
* Mongoose validation
* MongoDB session storage

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* Tailwind CSS
* bcrypt
* express-session
* connect-mongo

## Project Structure

```text
pigi/
├── controllers/
├── models/
├── routes/
├── middleware/
├── views/
├── public/
├── utils/
└── app.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd pigi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 4. Start the application

```bash
node app.js
```

The application will run locally on:

```text
http://localhost:3001
```

## Note

The `.env` file is intentionally excluded from the repository using `.gitignore`.
