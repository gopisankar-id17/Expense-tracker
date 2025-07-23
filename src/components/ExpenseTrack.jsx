
import { useState, useEffect } from "react";
import { fetchCurrencyRates } from "../utils/currencyRates";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import DashboardChart from "./DashboardChart";
import CurrencySelector from "./CurrencySelector";
import './Stylecss.css';
import axios from "axios";

export default function ExpenseTrack(){
  // Currency conversion state
  const [rates, setRates] = useState({ USD: 1 });
  const [loadingRates, setLoadingRates] = useState(false);
  // Currency state
  const [currency, setCurrency] = useState('USD');
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    INR: '₹',
    GBP: '£',
    JPY: '¥',
  };
  const currencySymbol = currencySymbols[currency] || '$';
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
    loadRates();
  }, []);

  useEffect(() => {
    if (currency) loadRates();
  }, [currency]);

  async function loadRates() {
    setLoadingRates(true);
    const result = await fetchCurrencyRates();
    setRates(result);
    setLoadingRates(false);
  }

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
  // Only one return statement, with DashboardChart included in the main dashboard
  // End of component

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
      <CurrencySelector currency={currency} setCurrency={setCurrency} />
      {loadingRates ? (
        <div style={{ textAlign: 'center', margin: '30px 0', fontWeight: 600 }}>Loading currency rates...</div>
      ) : (
        <>
          <ExpenseSummary
            summary={{
              totalIncome: income.reduce((sum, i) => sum + (i.amount / rates[i.currency || 'USD'] * rates[currency]), 0),
              totalExpenses: expenses.reduce((sum, e) => sum + (e.amount / rates[e.currency || 'USD'] * rates[currency]), 0),
              balance:
                income.reduce((sum, i) => sum + (i.amount / rates[i.currency || 'USD'] * rates[currency]), 0) -
                expenses.reduce((sum, e) => sum + (e.amount / rates[e.currency || 'USD'] * rates[currency]), 0),
            }}
            currencySymbol={currencySymbol}
          />
          <DashboardChart
            income={income.map(i => ({ ...i, amount: i.amount / rates[i.currency || 'USD'] * rates[currency] }))}
            expenses={expenses.map(e => ({ ...e, amount: e.amount / rates[e.currency || 'USD'] * rates[currency] }))}
            currencySymbol={currencySymbol}
          />
          <div className="forms-container">
            <div className="income-section">
              <h2 className="section-title">💰 Income</h2>
              <IncomeForm
                addIncome={addIncome}
                itemToEdit={incomeToEdit}
                setItemToEdit={setIncomeToEdit}
                currencySymbol={currencySymbol}
              />
            </div>
            <div className="expense-section">
              <h2 className="section-title">💸 Expenses</h2>
              <ExpenseForm
                addExpense={addExpense}
                itemToEdit={expenseToEdit}
                setItemToEdit={setExpenseToEdit}
                currencySymbol={currencySymbol}
              />
            </div>
          </div>
          <div className="lists-container">
            <div className="income-section">
              <h3 className="section-title">Income History</h3>
              <IncomeList
                income={income.map(i => ({ ...i, amount: i.amount / rates[i.currency || 'USD'] * rates[currency] }))}
                deleteIncome={deleteIncome}
                editIncome={setIncomeToEdit}
                currencySymbol={currencySymbol}
              />
            </div>
            <div className="expense-section">
              <h3 className="section-title">Expense History</h3>
              <ExpenseList
                expenses={expenses.map(e => ({ ...e, amount: e.amount / rates[e.currency || 'USD'] * rates[currency] }))}
                deleteExpense={deleteExpense}
                editExpense={setExpenseToEdit}
                currencySymbol={currencySymbol}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
