const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expensetracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Sample data
const sampleIncome = [
  { title: 'Monthly Salary', amount: 5000 },
  { title: 'Freelance Project', amount: 1200 },
  { title: 'Investment Return', amount: 500 },
  { title: 'Bonus', amount: 800 },
];

const sampleExpenses = [
  { title: 'Rent', amount: 1200 },
  { title: 'Groceries', amount: 300 },
  { title: 'Utilities', amount: 150 },
  { title: 'Transportation', amount: 200 },
  { title: 'Entertainment', amount: 100 },
  { title: 'Phone Bill', amount: 80 },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Income.deleteMany({});
    await Expense.deleteMany({});
    console.log('Cleared existing income and expenses');

    // Insert sample data
    await Income.insertMany(sampleIncome);
    await Expense.insertMany(sampleExpenses);
    console.log('Sample income and expenses added successfully');

    // Show current data
    const income = await Income.find();
    const expenses = await Expense.find();
    
    console.log('\nCurrent income in database:');
    income.forEach(item => {
      console.log(`- ${item.title}: $${item.amount}`);
    });

    console.log('\nCurrent expenses in database:');
    expenses.forEach(expense => {
      console.log(`- ${expense.title}: $${expense.amount}`);
    });

    // Calculate totals
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpenses;

    console.log('\n--- SUMMARY ---');
    console.log(`Total Income: $${totalIncome}`);
    console.log(`Total Expenses: $${totalExpenses}`);
    console.log(`Balance: $${balance}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
