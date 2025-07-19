import { useState, useEffect } from "react";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import './Stylecss.css'
import axios from "axios";

export default function ExpenseTrack(){
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [incomeToEdit, setIncomeToEdit] = useState(null);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    fetchIncome();
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/income');
      setIncome(response.data);
    } catch (error) {
      console.error("Fetch income error:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error("Fetch expenses error:", error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/summary');
      setSummary(response.data);
    } catch (error) {
      console.error("Fetch summary error:", error);
    }
  };

  const addIncome = async (title, amount, id = null) => {
    try {
      if (id) {
        // Update existing income
        const response = await axios.put(`http://localhost:3000/api/income/${id}`, {
          title,
          amount: Number(amount)
        });
        setIncome(income.map(item => 
          item._id === id ? response.data : item
        ));
        setIncomeToEdit(null);
      } else {
        // Add new income
        const response = await axios.post("http://localhost:3000/api/income", {
          title,
          amount: Number(amount)
        });
        setIncome([response.data, ...income]);
      }
      fetchSummary(); // Update summary after income change
    } catch (error) {
      console.error("Error adding/updating income:", error);
    }
  };

  const addExpense = async (title, amount, id = null) => {
    try {
      if (id) {
        // Update existing expense
        const response = await axios.put(`http://localhost:3000/api/expenses/${id}`, {
          title,
          amount: Number(amount)
        });
        setExpenses(expenses.map(exp => 
          exp._id === id ? response.data : exp
        ));
        setExpenseToEdit(null);
      } else {
        // Add new expense
        const response = await axios.post("http://localhost:3000/api/expenses", {
          title,
          amount: Number(amount)
        });
        setExpenses([response.data, ...expenses]);
      }
      fetchSummary(); // Update summary after expense change
    } catch (error) {
      console.error("Error adding/updating expense:", error);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/income/${id}`);
      setIncome(income.filter((item) => item._id !== id));
      fetchSummary(); // Update summary after income deletion
    } catch (error) {
      console.error("Delete income error:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
      fetchSummary(); // Update summary after expense deletion
    } catch (error) {
      console.error("Delete expense error:", error);
    }
  };

  return (
    <div className="expense-container">
      <h1>Personal Expense Tracker</h1>
      
      <ExpenseSummary summary={summary} />
      
      <div className="forms-container">
        <IncomeForm
          addIncome={addIncome}
          itemToEdit={incomeToEdit}
          setItemToEdit={setIncomeToEdit}
        />
        
        <ExpenseForm
          addExpense={addExpense}
          itemToEdit={expenseToEdit}
          setItemToEdit={setExpenseToEdit}
        />
      </div>

      <div className="lists-container">
        <IncomeList
          income={income}
          deleteIncome={deleteIncome}
          editIncome={setIncomeToEdit}
        />
        
        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
          editExpense={setExpenseToEdit}
        />
      </div>
    </div>
  );
}
