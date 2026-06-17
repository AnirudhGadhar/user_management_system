# User Management System

## Project Overview

A full-stack User Management System developed using React, Spring Boot, and MongoDB Atlas. The application allows users to register, log in, view their profile, and access protected features through a secure authentication flow.

---

## Features

* User Signup
* User Login with Validation
* Fetch User Profile
* View All Registered Users
* Authentication-Based Access Control
* MongoDB Atlas Data Storage
* REST API Integration
* Responsive User Interface using Material UI

---

## Setup and Run Instructions

### Backend (Spring Boot)

1. Navigate to the backend project folder.

```bash
cd backend
```

2. Run the Spring Boot application.

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8089
```

### Frontend (React + Vite + Material UI)

1. Navigate to the frontend project folder.

```bash
cd frontend
```

2. Install dependencies.

```bash
npm install
```

3. Run the application.

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Technology Stack Used

### Backend

* Java
* Spring Boot
* Maven

### Database

* MongoDB Atlas

### Frontend

* React
* Vite
* Material UI (MUI)
* Axios
* React Router

### Build Tools

* npm
* Maven

### IDE

* IntelliJ IDEA
* VS Code

---

## Assumptions Made During Development

* Users must sign up or log in before accessing any main application features.
* User passwords are stored in an encrypted format within the database.
* The backend server runs locally on port 8089.
* The frontend communicates with the backend using REST APIs.
* User authentication is required to access protected features.

---

## AI Tools Used

I used GitHub Copilot primarily for frontend development, especially while building the user interface. It helped me quickly design and implement React components using Material UI, making the application more responsive and user-friendly.

Copilot also assisted in structuring React components, managing routing, and integrating frontend screens with backend APIs. This significantly improved development speed and productivity throughout the project.

---

## Challenges Faced

One of the main challenges encountered during development was resolving **500 Internal Server Error** responses while testing backend APIs using Postman. The issue was identified by carefully reviewing request payloads, backend validation logic, and API handling methods.

The problem was resolved by correcting the request data structure and ensuring that backend methods properly processed incoming requests. This debugging experience improved my understanding of frontend-backend communication and helped enhance the reliability and stability of the application.

---

## Application Screenshots

### Signup Page

![Signup Page](screenshots/signup.png)

### Login Page

![Login Page](screenshots/login.png)

### Update Profile Page

![Update Profile](screenshots/update.png)

### All Users Page

![All Users](screenshots/allusers.png)

### User Management System Home Page

![User Management System](screenshots/usermanagement.png)

### MongoDB Atlas Database

![Database](screenshots/db.png)

---

## Project Structure

```text
user-management-system/
│
├── screenshots/
│   ├── usermanagement.png
│   ├── signup.png
│   ├── login.png
│   ├── update.png
│   ├── allusers.png
│   └── db.png
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```
