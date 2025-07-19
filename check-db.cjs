const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expensetracker');
    console.log('✅ Connected to MongoDB successfully');
    
    // List all databases
    const admin = mongoose.connection.db.admin();
    const databases = await admin.listDatabases();
    console.log('\n📊 Available databases:');
    databases.databases.forEach(db => {
      console.log(`  - ${db.name} (${db.sizeOnDisk} bytes)`);
    });
    
    // Check if expensetracker database exists
    const expenseTrackerExists = databases.databases.find(db => db.name === 'expensetracker');
    if (expenseTrackerExists) {
      console.log('\n✅ "expensetracker" database found!');
      
      // List collections in expensetracker
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('\n📁 Collections in expensetracker:');
      collections.forEach(col => {
        console.log(`  - ${col.name}`);
      });
      
      // Count documents in expenses collection
      const expenseCount = await mongoose.connection.db.collection('expenses').countDocuments();
      console.log(`\n📄 Number of expenses: ${expenseCount}`);
      
      // Show sample expenses
      const sampleExpenses = await mongoose.connection.db.collection('expenses').find().limit(3).toArray();
      console.log('\n💰 Sample expenses:');
      sampleExpenses.forEach(expense => {
        console.log(`  - ${expense.title}: $${expense.amount}`);
      });
      
    } else {
      console.log('\n❌ "expensetracker" database not found');
    }
    
    console.log('\n🌐 Full connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/expensetracker');
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkDatabase();
