# Real Estate Web Application

## Overview

This is a web-based real estate application that allows users to sign up, log in, and view property listings. The backend is built using Node.js with Express and MySQL, while the frontend uses HTML, CSS, and JavaScript for a dynamic user experience.

---

## Features

1. **User Authentication**: 
   - Signup and login functionality with password hashing using bcrypt.
   - Session management for user authentication.

2. **Property Listings**:
   - Fetch and display property details from the database.
   - Navigate to detailed property pages.

3. **Frontend-Backend Integration**:
   - Dynamic communication between frontend and backend using REST APIs.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)
- A modern web browser

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the Database
- Open your MySQL client (e.g., MySQL Workbench or the MySQL CLI).
- Execute the `db.sql` script to create the database and tables:

```sql
source path/to/db.sql;
```

### 4. Configure the Backend
Edit the database connection details in `server.js` to match your MySQL setup:

```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your-password',
    database: 'new_schema',
});
```

### 5. Start the Backend Server
```bash
node server.js
```
- The server will run at `http://localhost:3000`

### 6. Serve the Frontend
Open the `index.html` file in a browser, or use a live server (e.g., [VS Code Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

---

## Project Structure

```
├── backend/
│   ├── server.js            # Backend server code
│   └── db.sql               # Database schema and sample data
├── frontend/
│   ├── index.html           # Main page (property listings)
│   ├── login.html           # Login page
│   ├── signup.html          # Signup page
│   ├── property_listing.html # Property details page
│   ├── style.css            # Stylesheet for frontend
│   └── script.js            # Frontend JavaScript logic
├── README.md                # Project documentation
├── package.json             # Node.js dependencies
└── package-lock.json        # Dependency lock file
```

---

## Usage

1. Start the backend server using `node server.js`.
2. Open `index.html` in your browser to access the application.
3. Use the signup form to register a new account.
4. Log in using the registered credentials to view property listings.

---

## API Endpoints

### 1. User Authentication
- **POST `/signup`**:
  - Request Body: `{ email: string, password: string }`
  - Response: `{ success: boolean, message: string }`

- **POST `/login`**:
  - Request Body: `{ email: string, password: string }`
  - Response: `{ success: boolean, message: string }`

### 2. Property Listings
- **GET `/properties`**:
  - Response: Array of property objects `{ id, name, price, location, description }`

---

## Technologies Used

### Frontend:
- HTML5, CSS3, JavaScript (ES6)

### Backend:
- Node.js
- Express.js

### Database:
- MySQL

### Other Tools:
- bcrypt (for password hashing)
- express-session (for session management)
- body-parser (for parsing request bodies)

---

## Troubleshooting

### Common Issues

1. **`404 (Not Found)` Errors:**
   - Ensure the backend server is running.
   - Check the API routes and ensure they match the frontend requests.

2. **Database Connection Issues:**
   - Verify your MySQL credentials and database name in `server.js`.
   - Ensure MySQL server is running.

3. **Password Authentication Fails:**
   - Ensure the passwords are hashed correctly before saving to the database.
   - Use a tool like [bcrypt](https://www.npmjs.com/package/bcrypt) for consistent hashing.

---


