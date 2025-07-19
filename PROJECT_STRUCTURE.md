# Expense Tracker - Project Structure

## 📁 Project Overview

This is a full-stack expense tracking application with the following structure:

```
expense-tracker/
├── 📄 .env                     # Environment variables
├── 📄 .gitignore              # Git ignore file
├── 📄 eslint.config.js        # ESLint configuration
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Dependencies and scripts
├── 📄 README.md               # Project documentation
├── 📄 server.cjs              # Express.js backend server
├── 📄 seed.cjs                # Database seeding script
├── 📄 vite.config.js          # Vite configuration
│
├── 📁 src/                    # Frontend source code
│   ├── 📄 App.css             # Global styles
│   ├── 📄 App.jsx             # Main React component
│   ├── 📄 index.css           # Base styles
│   ├── 📄 main.jsx            # React entry point
│   ├── 📄 NextProps.jsx       # Utility component
│   ├── 📄 Work.jsx            # Additional component
│   │
│   ├── 📁 assets/             # Static assets
│   │   ├── 🖼️ flower.avif     # Image asset
│   │   └── 🖼️ react.svg       # React logo
│   │
│   └── 📁 components/         # React components
│       ├── 📄 ExpenseForm.jsx     # Add/Edit expense form
│       ├── 📄 ExpenseList.jsx     # Display expenses list
│       ├── 📄 ExpenseSummary.jsx  # Income/Expense summary
│       ├── 📄 ExpenseTrack.jsx    # Main expense tracker
│       └── 📄 Stylecss.css        # Component styles
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/expensetracker
PORT=3000
NODE_ENV=development
```

### 4. Database Setup
```bash
npm run seed  # Add sample data
```

### 5. Run Application
```bash
npm start     # Runs both frontend and backend
```

## 🌐 Application URLs

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3000
- **API Endpoints**: http://localhost:3000/api/expenses

## 📊 Features

✅ **Frontend (React)**
- Add new expenses/income
- Edit existing entries
- Delete expenses
- Real-time balance calculation
- Responsive design

✅ **Backend (Node.js/Express)**
- RESTful API endpoints
- MongoDB integration
- CRUD operations
- Error handling
- CORS support

✅ **Database (MongoDB)**
- Persistent data storage
- Expense schema validation
- Sample data seeding

## 🛠️ Technologies

**Frontend:**
- React 19
- Axios (HTTP client)
- CSS3 (Custom styling)
- Vite (Build tool)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv (Environment variables)

**Development:**
- Nodemon (Auto-restart)
- Concurrently (Run multiple scripts)
- ESLint (Code linting)

## 📝 API Documentation

### GET /api/expenses
Returns all expenses sorted by creation date (newest first)

### POST /api/expenses
Creates a new expense
```json
{
  "title": "Expense Title",
  "amount": 100
}
```

### PUT /api/expenses/:id
Updates an existing expense

### DELETE /api/expenses/:id
Deletes an expense by ID

## 🎯 Usage Tips

1. **Positive amounts** = Income (e.g., 1000)
2. **Negative amounts** = Expenses (e.g., -500)
3. **Edit**: Click "Edit" button next to any item
4. **Delete**: Click "Delete" button to remove
5. **Balance**: Automatically calculated (Income - Expenses)

## 🔧 Development Commands

```bash
npm start         # Run both frontend & backend
npm run client    # Frontend only (Vite dev server)
npm run server    # Backend only (Express server)
npm run seed      # Populate database with sample data
npm run build     # Build for production
npm run preview   # Preview production build
```

## 🌟 Project Status

✅ **Completed Features:**
- Full CRUD operations
- Database integration
- Real-time updates
- Error handling
- Responsive UI
- Sample data seeding

🚀 **Ready to use!** The application is fully functional and ready for development or production deployment.
