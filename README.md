# # Expense Tracker

A full-stack expense tracking application built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features

- Add, edit, and delete expenses
- View income, expense, and balance summary
- Persistent data storage with MongoDB
- Real-time updates
- Clean and responsive UI

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (Community Edition)
- npm or yarn

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Database Setup

### Option 1: Local MongoDB Installation

1. Install MongoDB Community Edition from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - On Windows: MongoDB should start automatically as a service
   - On macOS: `brew services start mongodb/brew/mongodb-community`
   - On Linux: `sudo systemctl start mongod`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get your connection string
3. Update the `.env` file with your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expensetracker
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/expensetracker
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode (Both Frontend and Backend)

Run both the frontend and backend simultaneously:
```bash
npm start
```

This will start:
- Backend server on `http://localhost:3000`
- Frontend development server on `http://localhost:5173`

### Running Frontend and Backend Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

**Production build:**
```bash
npm run build
npm run preview
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Project Structure

```
expense-tracker/
├── src/
│   ├── components/
│   │   ├── ExpenseForm.jsx      # Form for adding/editing expenses
│   │   ├── ExpenseList.jsx      # List of all expenses
│   │   ├── ExpenseSummary.jsx   # Summary of income/expenses/balance
│   │   ├── ExpenseTrack.jsx     # Main component
│   │   └── Stylecss.css         # Component styles
│   ├── App.jsx                  # Main App component
│   └── main.jsx                 # React entry point
├── server.js                    # Express server and API routes
├── .env                         # Environment variables
└── package.json                 # Dependencies and scripts
```

## Usage

1. **Adding Expenses**: Use the form at the top to add new expenses. Enter a title and amount (positive for income, negative for expenses).

2. **Editing Expenses**: Click the "Edit" button next to any expense to modify it.

3. **Deleting Expenses**: Click the "Delete" button to remove an expense.

4. **Viewing Summary**: The summary section shows your total income, expenses, and current balance.

## Technologies Used

**Frontend:**
- React 19
- Axios for API calls
- CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS for cross-origin requests

**Development Tools:**
- Vite (build tool)
- Nodemon (auto-restart server)
- Concurrently (run multiple scripts)

## Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running on your system
- Check that the connection string in `.env` is correct
- For MongoDB Atlas, ensure your IP is whitelisted

**Port Issues:**
- If port 3000 is in use, change the PORT variable in `.env`
- If port 5173 is in use, Vite will automatically use the next available port

**CORS Issues:**
- Ensure the backend server is running on the correct port
- Check that the frontend is making requests to the correct backend URL

## License

This project is open source and available under the [MIT License](LICENSE).+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
