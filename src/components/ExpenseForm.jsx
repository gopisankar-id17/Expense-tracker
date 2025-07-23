import React, { useState, useEffect } from 'react';

export default function ExpenseForm({ addExpense, itemToEdit, setItemToEdit, currencySymbol = '$' }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setAmount(itemToEdit.amount.toString());
    } else {
      setTitle('');
      setAmount('');
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || Number(amount) <= 0) return;
    addExpense(title, amount, itemToEdit?._id);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="form-section">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <label>Expense Description</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Rent, Groceries, Utilities"
          required
        />

        <label>Amount ({currencySymbol})</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Enter amount in ${currencySymbol}`}
          min="0"
          step="0.01"
          required
        />

        <div className="button-group">
          <button type="submit" className="expense-btn">
            {itemToEdit ? 'Update Expense' : 'Add Expense'}
          </button>
          {itemToEdit && (
            <button
              type="button"
              onClick={() => {
                setItemToEdit(null);
                setTitle('');
                setAmount('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
