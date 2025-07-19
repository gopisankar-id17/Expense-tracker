const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expensetracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Sample data
const sampleExpenses = [
  { title: 'Salary', amount: 5000 },
  { title: 'Freelance Work', amount: 1200 },
  { title: 'Groceries', amount: -300 },
  { title: 'Rent', amount: -1200 },
  { title: 'Utilities', amount: -150 },
  { title: 'Transportation', amount: -200 },
  { title: 'Entertainment', amount: -100 },
  { title: 'Investment Return', amount: 500 },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Expense.deleteMany({});
    console.log('Cleared existing expenses');

    // Insert sample data
    await Expense.insertMany(sampleExpenses);
    console.log('Sample expenses added successfully');

    // Show current expenses
    const expenses = await Expense.find();
    console.log('\nCurrent expenses in database:');
    expenses.forEach(expense => {
      console.log(`- ${expense.title}: $${expense.amount}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
