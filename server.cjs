const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expensetracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Income Schema
const incomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Expense Schema
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Income = mongoose.model('Income', incomeSchema);
const Expense = mongoose.model('Expense', expenseSchema);

// Routes

// GET all income
app.get('/api/income', async (req, res) => {
  try {
    const income = await Income.find().sort({ createdAt: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET summary (total income, total expenses, balance)
app.get('/api/summary', async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const income = totalIncome[0]?.total || 0;
    const expenses = totalExpenses[0]?.total || 0;
    const balance = income - expenses;

    res.json({
      totalIncome: income,
      totalExpenses: expenses,
      balance: balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new income
app.post('/api/income', async (req, res) => {
  try {
    const { title, amount } = req.body;
    
    if (!title || amount === undefined || amount <= 0) {
      return res.status(400).json({ message: 'Title and positive amount are required' });
    }

    const income = new Income({
      title,
      amount: Number(amount)
    });

    const savedIncome = await income.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { title, amount } = req.body;
    
    if (!title || amount === undefined || amount <= 0) {
      return res.status(400).json({ message: 'Title and positive amount are required' });
    }

    const expense = new Expense({
      title,
      amount: Number(amount)
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update income
app.put('/api/income/:id', async (req, res) => {
  try {
    const { title, amount } = req.body;
    
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      { title, amount: Number(amount) },
      { new: true, runValidators: true }
    );

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update expense
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { title, amount } = req.body;
    
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount: Number(amount) },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE income
app.delete('/api/income/:id', async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
