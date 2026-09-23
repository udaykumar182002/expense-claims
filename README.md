# Expense Claims Management System

A full-stack Expense Claims Management System that allows employees to submit and track expense claims, managers to review and approve claims, and finance teams to process payments and monitor monthly expenses.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control

### Staff
- Create expense claims
- View submitted claims
- Track claim status
- Add receipt information
- Receipt text parsing
- Duplicate claim detection

### Manager
- View pending claims
- Approve claims
- Reject claims
- Managers cannot approve or reject their own claims

### Finance
- View approved claims
- Mark approved claims as paid
- View monthly expense reports
- Monitor spending by employee and category

## User Roles

| Role | Permissions |
|------|-------------|
| Staff | Create and view own claims |
| Manager | Create claims and approve/reject other employees' claims |
| Finance | View approved claims, process payments and view reports |

## Technology Stack

### Frontend
- React.js
- React Router
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs
- REST APIs

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

## Project Structure

```text
expense-claims/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── .gitignore
└── README.md
